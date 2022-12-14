import { useEffect, useState } from 'react';
import { TransferItem, SkeletonTransferItem } from '@components/Bridge/TransferItem';
import { EventRegistered } from '@store/bridge/reducer';
import { useBridge } from '@store/bridge/hooks';
import { useWeb3React } from '@web3-react/core';

const TransferHistory = () => {
  const [itemsToShow, setItemsToShow] = useState<number>(5);

  const { isActive } = useWeb3React();
  const { history, historyLoading, loadHistory, onlyMyHistory, setOnlyMyHistory } = useBridge();

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const transactionItems = history
    .filter((event: EventRegistered, index: number) => index < itemsToShow)
    .map((event: EventRegistered) => {
      return <TransferItem key={event._hash} event={event} />;
    });

  return (
    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mb-5">
      <div className="title-block">Recent Transfers</div>
      {isActive && (
        <div className="toggleTransactionsBlock">
          <input
            type="checkbox"
            id="toggleOwnAll"
            className="transactionsCheckbox"
            checked={onlyMyHistory}
            onChange={() => setOnlyMyHistory(!onlyMyHistory)}
          />
          <label htmlFor="toggleOwnAll" className="toggleTransactions">
            <div>All</div>
            <div>Only My</div>
          </label>
        </div>
      )}
      {historyLoading ? (
        <>
          <SkeletonTransferItem />
          <SkeletonTransferItem />
          <SkeletonTransferItem />
          <SkeletonTransferItem />
          <SkeletonTransferItem />
        </>
      ) : transactionItems.length > 0 ? (
        transactionItems
      ) : (
        <></>
      )}
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
