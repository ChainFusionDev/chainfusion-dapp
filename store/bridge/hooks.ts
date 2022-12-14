import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@store/index';
import { EventRegistered, setHistory, setOnlyMyHistory } from './reducer';
import { useChainContext } from '@src/context/ChainContext';
import { getChainById } from '@src/config';


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

    let eventHistory: EventRegistered[] = [];
    for (const event of events) {
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

      eventHistory.push(event.args);
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

    setHistory: useCallback((validators: EventRegistered[]) => dispatch(setHistory(validators)), []),
    setOnlyMyHistory: useCallback((onlyMyHistory: boolean) => dispatch(setOnlyMyHistory(onlyMyHistory)), []),

    loadHistory: loadHistory,
  };
}