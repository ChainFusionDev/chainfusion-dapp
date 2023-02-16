import { useEffect } from 'react';
import { TransferItem, SkeletonTransferItem } from '@components/Bridge/TransferItem';
import { useBridge } from '@store/bridge/hooks';
import { useWeb3React } from '@web3-react/core';
import { BridgeTransfer } from '@src/types';
import { useAPI } from '@src/hooks/useAPI';
import { AnimatePresence, motion } from 'framer-motion';

const TransferHistory = () => {
  const { isActive } = useWeb3React();
  const { history, historyLoading, historyItemsToShow, onlyMyHistory, setHistoryItemsToShow, setOnlyMyHistory } =
    useBridge();

  const { loadHistory } = useAPI();

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const transactionItems = history
    .filter((transfer: BridgeTransfer, index: number) => index < historyItemsToShow)
    .map((transfer: BridgeTransfer) => {
      return <TransferItem key={transfer.hash} transfer={transfer} />;
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
            onChange={() => {
              setOnlyMyHistory(!onlyMyHistory);
            }}
          />
          <label htmlFor="toggleOwnAll" className="toggleTransactions">
            <div>All</div>
            <div>Only My</div>
          </label>
        </div>
      )}
      <AnimatePresence>
        <motion.div
          key={`only-my-${onlyMyHistory}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
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

          {history.length > historyItemsToShow && !historyLoading && (
            <div className="text-center mt-4 mb-2">
              <a onClick={() => setHistoryItemsToShow(historyItemsToShow + 5)} className="show-more-btn">
                Show More
              </a>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TransferHistory;
