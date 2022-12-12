import { useEffect, useState } from 'react';
import { TransferItem, SkeletonTransferItem } from '@components/Bridge/TransferItem';
import { EventRegistered } from '@store/bridge/reducer';
import { useBridge } from '@store/bridge/hooks';

const TransferHistory = () => {
  const [itemsToShow, setItemsToShow] = useState<number>(5);

  const { history, historyLoading, loadHistory } = useBridge();

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const transactionItems = history
    .filter((event: EventRegistered, index: number) => index < itemsToShow)
    .map((event: EventRegistered) => {
      return <TransferItem key={event._hash} event={event} />;
    });

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
