import { useEffect, useState } from 'react';
import { TransferItem, SkeletonTransferItem } from '@components/Bridge/TransferItem';
import { getChainById } from '@src/config';
import { useChainContext } from '@src/context/ChainContext';
import { EventRegistered } from '@store/bridge/reducer';
import { useBridge } from '@store/bridge/hooks';

const TransferHistory = () => {
  const [itemsToShow, setItemsToShow] = useState<number>(5);

  const { history, historyLoading, setHistory } = useBridge();
  const { nativeContainer, networkContainer, addressContainer } = useChainContext();

  useEffect(() => {
    if (nativeContainer === undefined || addressContainer === undefined) {
      return;
    }

    const loadHistory = async () => {
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

      eventHistory = eventHistory.reverse();
      setHistory([...eventHistory]);
    };

    loadHistory();
  }, [setHistory, nativeContainer, networkContainer, addressContainer]);

  const transactionItems = history
    .map((event: EventRegistered, index: number) => {
      return index < itemsToShow ? <TransferItem key={index} event={event} /> : null;
    })
    .filter((element) => element !== null);

  if (historyLoading) {
    return (
      <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mb-5">
        <div className="title-block">Previous Transfers</div>
        <SkeletonTransferItem />
        <SkeletonTransferItem />
        <SkeletonTransferItem />
        <SkeletonTransferItem />
        <SkeletonTransferItem />
      </div>
    );
  }

  if (!transactionItems.length) {
    return <></>;
  }

  return (
    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mb-5">
      <div className="title-block">Previous Transfers</div>
      {transactionItems}
      {history.length > itemsToShow && (
        <div className="text-center mt-4 mb-2">
          <a onClick={() => setItemsToShow(itemsToShow + 5)} className="show-more-btn">
            Show More
          </a>
        </div>
      )}
    </div>
  );
};

export default TransferHistory;
