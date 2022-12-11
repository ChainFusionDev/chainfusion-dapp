import { useEffect, useState } from 'react';
import { TransactionItem, SkeletonTransactionItem, EventRegistered } from '@components/Bridge/TransactionItem';
import { getChainById } from '@src/config';
import { useChainContext } from '@src/context/ChainContext';

const TransactionHistory = () => {
  const [history, setHistory] = useState<EventRegistered[]>([]);
  const [itemsToShow, setItemsToShow] = useState<number>(5);
  const [historyLoaded, setHistoryLoaded] = useState(false);

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
      setHistoryLoaded(true);
    };

    loadHistory();
  }, [nativeContainer, networkContainer, addressContainer]);

  const transactionItems = history
    .map((event: EventRegistered, index: number) => {
      return index < itemsToShow ? <TransactionItem key={index} event={event} /> : null;
    })
    .filter((element) => element !== null);

  if (!historyLoaded) {
    return (
      <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mb-5">
        <div className="title-block">Previous Transfers</div>
        <SkeletonTransactionItem />
        <SkeletonTransactionItem />
        <SkeletonTransactionItem />
        <SkeletonTransactionItem />
        <SkeletonTransactionItem />
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

export default TransactionHistory;
