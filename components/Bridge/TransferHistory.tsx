import { useEffect, useState } from 'react';
import { TransferItem, SkeletonTransferItem } from '@components/Bridge/TransferItem';
import { useChainContext } from '@src/context/ChainContext';
import { EventRegistered } from '@store/bridge/reducer';
import { useBridge } from '@store/bridge/hooks';

const TransferHistory = () => {
  const [itemsToShow, setItemsToShow] = useState<number>(5);

  const { history, historyLoading } = useBridge();
  const { networkContainer, actions } = useChainContext();

  useEffect(() => {
    if (networkContainer === undefined) {
      return;
    }

    actions.loadHistory();
  }, [networkContainer]);

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
