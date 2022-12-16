import { getChainById } from '@src/config';
import { useChainContext } from '@src/context/ChainContext';
import { BridgeTransfer } from '@src/types';
import { decodeBridgeTransfer, decodeSendEventData } from '@src/utils';
import { useBridge } from '@store/bridge/hooks';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';

export function useAPI() {
  const { account, isActive } = useWeb3React();
  const { setHistory, setHistoryLoading, onlyMyHistory } = useBridge();
  const { nativeContainer, networkContainer } = useChainContext();

  const loadHistory = useCallback(async () => {
    if (nativeContainer === undefined || networkContainer.size === 0) {
      return;
    }

    setHistoryLoading(true);

    const currentBlock = await nativeContainer.provider.getBlockNumber();
    let startFrom = currentBlock - 100000;
    if (startFrom < 0) {
      startFrom = 0;
    }

    const filter = nativeContainer.eventRegistry.filters.EventRegistered();
    const events = await nativeContainer.eventRegistry.queryFilter(filter, startFrom, currentBlock);

    if (events.length === 0) {
      setHistory([]);
      setHistoryLoading(false);
    }

    const history: BridgeTransfer[] = [];
    for (const event of events) {
      if (event.args._eventType !== 0) {
        continue;
      }

      const fromChain = getChainById(event.args._sourceChain.toNumber());
      const toChain = getChainById(event.args._destinationChain.toNumber());

      if (fromChain === undefined || toChain === undefined) {
        continue;
      }

      const fromNetwork = networkContainer.get(fromChain.identifier);
      const erc20BridgeAddress = fromNetwork?.contracts?.erc20Bridge.address;
      if (event.args._appContract !== erc20BridgeAddress) {
        continue;
      }

      const data = decodeSendEventData(event.args._data);
      if (data === undefined) {
        continue;
      }

      const transfer = decodeBridgeTransfer(event.args._hash, fromChain, toChain, data);
      if (transfer === undefined) {
        continue;
      }

      if (onlyMyHistory && isActive && transfer.sender !== account && transfer.receiver !== account) {
        continue;
      }

      history.push(transfer);
    }

    setHistory(history.reverse());
    setHistoryLoading(false);
  }, [nativeContainer, networkContainer, setHistory, setHistoryLoading, onlyMyHistory, account, isActive]);

  return {
    loadHistory,
  };
}
