import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@store/index';
import { setHistory, setOnlyMyHistory } from './reducer';
import { useChainContext } from '@src/context/ChainContext';
import { getChainById } from '@src/config';
import { BridgeTransfer } from '@src/types';
import { decodeBridgeTransfer, decodeSendEventData } from '@src/utils';

export function useBridge() {
  const dispatch = useDispatch();
  const { nativeContainer, networkContainer } = useChainContext();

  const loadHistory = useCallback(async () => {
    if (nativeContainer === undefined) {
      return;
    }

    const currentBlock = await nativeContainer.provider.getBlockNumber();
    const filter = nativeContainer.eventRegistry.filters.EventRegistered();
    const events = await nativeContainer.eventRegistry.queryFilter(filter, currentBlock - 100000, currentBlock);

    if (events.length === 0) {
      dispatch(setHistory([]));
    }

    let eventHistory: BridgeTransfer[] = [];
    for (const event of events) {
      if (event.args._eventType !== 0) {
        continue;
      }

      const fromChain = getChainById(event.args._sourceChain.toNumber());
      const toChain = getChainById(event.args._destinationChain.toNumber());

      if (fromChain === undefined || toChain === undefined) {
        continue;
      }

      const fromNetwork = networkContainer[fromChain.identifier];

      const erc20BridgeAddress = fromNetwork?.contracts?.erc20Bridge.address;
      if (event.args._appContract !== erc20BridgeAddress) {
        continue;
      }

      const data = decodeSendEventData(event.args._data);
      if (data === undefined) {
        continue;
      }
      const chainHistoryItem = decodeBridgeTransfer(event.args._hash, fromChain, toChain, data);

      if (chainHistoryItem === undefined) {
        continue;
      }

      eventHistory.push(chainHistoryItem);
    }

    if (eventHistory.length === 0) {
      return;
    }

    dispatch(setHistory(eventHistory.reverse()));
  }, [nativeContainer, networkContainer]);

  return {
    history: useAppSelector(({ bridge }) => bridge.history),
    historyLoading: useAppSelector(({ bridge }) => bridge.historyLoading),
    onlyMyHistory: useAppSelector(({ bridge }) => bridge.onlyMyHistory),

    setHistory: useCallback((history: BridgeTransfer[]) => dispatch(setHistory(history)), []),
    setOnlyMyHistory: useCallback((onlyMyHistory: boolean) => dispatch(setOnlyMyHistory(onlyMyHistory)), []),

    loadHistory: loadHistory,
  };
}