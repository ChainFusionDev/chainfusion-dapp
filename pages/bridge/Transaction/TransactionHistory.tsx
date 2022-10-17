import React, { useState } from 'react';
import transactionHistory from '@data/transaction-history.json';
import TransactionItem, { TransactionItemProps } from 'pages/bridge/Transaction/TransactionItem';

const TransactionHistory = () => {
  const [transactions, setTransactions] = React.useState(transactionHistory);
  const [isMore, setIsMore] = useState(false);
  const [count, setCount] = useState(5);

  if (!transactions.length) {
    return <></>;
  }

  return (
    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mb-5">
      <div className="title-block">Previous Transfers</div>

      {transactions.map((transaction: TransactionItemProps, index: number) =>
        (index < count && !isMore) || isMore ? (
          <TransactionItem
            key={index}
            from={transaction.from}
            to={transaction.to}
            sender={transaction.sender}
            receiver={transaction.receiver}
            validatorFee={transaction.validatorFee}
            liquidityFee={transaction.liquidityFee}
            status={transaction.status}
          />
        ) : null
      )}

      {!isMore ? (
        <div className="text-center mt-4 mb-2">
          <a onClick={() => setIsMore(true)} className="loadmore-btn">
            Load more
          </a>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default TransactionHistory;
