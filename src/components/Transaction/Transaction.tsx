import React, { useState } from 'react';
import transactionHistory from '@data/transactionHistory.json'
import TransactionElement, { TransactionElementProps } from "@components/Transaction/TransactionElement";

const Transaction = () => {
  const [transactions, setTransactions] = React.useState(transactionHistory);
  const [isMore, setIsMore] = useState(false)
  const [count, setCount] = useState(5)

  if (!transactions.length) {
    return <></>
  }

  return (
    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mb-5">
      <div className="title-block">Previous Transfers</div>

      {
        transactions && transactions.map((transaction: TransactionElementProps, index: number) => (
          index < count && !isMore || isMore

            ? <TransactionElement
              key={index}
              from={transaction.from}
              to={transaction.to}
              sender={transaction.sender}
              receiver={transaction.receiver}
              validatorFee={transaction.validatorFee}
              liquidityFee={transaction.liquidityFee}
              status={transaction.status}
            />

            : null
        ))
      }

      <div className="text-center mt-4 mb-2">
        <a onClick={() => setIsMore(!isMore)} className="loadmore-btn">
          {!isMore ? 'Load more' : 'Show less '}
        </a>
      </div>
    </div>
  );
};

export default Transaction;
