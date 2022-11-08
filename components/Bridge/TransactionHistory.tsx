import { useState } from 'react';
import TransactionItem from '@components/Bridge/TransactionItem';
import { transactionHistory } from '@src/config';
import { TransactionHistoryItem } from '@src/types';

const TransactionHistory = () => {
  const defaultItemsCount = 5;
  const history = transactionHistory();

  const [showAll, setShowAll] = useState(false);

  if (!history.length) {
    return <></>;
  }

  const transactionItems = history.map((item: TransactionHistoryItem, index: number) =>
    showAll || index < defaultItemsCount ? <TransactionItem key={index} item={item} /> : null
  );

  return (
    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mb-5">
      <div className="title-block">Previous Transfers</div>
      {transactionItems}
      {!showAll && (
        <div className="text-center mt-4 mb-2">
          <a onClick={() => setShowAll(true)} className="loadmore-btn">
            Load more
          </a>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
