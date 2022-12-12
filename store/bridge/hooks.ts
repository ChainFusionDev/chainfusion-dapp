import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@store/index';
import { EventRegistered, setHistory } from './reducer';
import { useChainContext } from '@src/context/ChainContext';
import { getChainById } from '@src/config';


export function useBridge() {
  const dispatch = useDispatch();
  const { nativeContainer, networkContainer, addressContainer } = useChainContext();

  return {
    history: useAppSelector(({ bridge }) => bridge.history),
    historyLoading: useAppSelector(({ bridge }) => bridge.historyLoading),

    setHistory: useCallback((validators: EventRegistered[]) => dispatch(setHistory(validators)), []),

    loadHistory: useCallback(async () => {
      if (nativeContainer === undefined || addressContainer === undefined) {
        return;
      }

      const currentBlock = await nativeContainer.provider.getBlockNumber();
      const filter = nativeContainer.eventRegistry.filters.EventRegistered();
      const events = await nativeContainer.eventRegistry.queryFilter(filter, currentBlock - 100000, currentBlock);

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
    }, [networkContainer]),
  };
}
