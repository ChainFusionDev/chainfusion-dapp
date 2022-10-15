import React, { useState } from 'react';

interface Token {
  name: string;
  img: string;
}

interface Blockchain {
  name: string;
  img: string;
}

interface Fee {
  token: Token;
  amount: number;
}

export interface TransactionElementProps {
  from: {
    blockchain: Blockchain;
    token: Token;
    amount: number;
  };
  to: {
    blockchain: Blockchain;
    token: Token;
    amount: number;
  };
  sender: string;
  receiver: string;
  validatorFee: Fee;
  liquidityFee: Fee;
  status: string;
}

const TransactionElement = ({
  from,
  to,
  sender,
  receiver,
  validatorFee,
  liquidityFee,
  status,
}: TransactionElementProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="transfer-block mb-2">
      <a
        data-toggle="collapse"
        href={`#${sender}`}
        role="button"
        aria-expanded={open}
        aria-controls={sender}
        className="btn-block py-2 with-chevron"
        onClick={() => setOpen(!open)}
      >
        <p className="transaction-info mb-0 px-3 py-2 d-flex align-items-center">
          <span>
            <i className={`fa-regular ${open ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </span>
          <span className="from-transaction d-flex flex-grow-1 justify-content-start">
            <span className="blockchain-fees ml-2">
              <img src={`/img/${from.blockchain.img}.svg`} alt={`${from.blockchain.name} Logo`} />{' '}
              {from.blockchain.name}: <strong>{from.amount}</strong>{' '}
            </span>
            <span className="token-fees">
              <img src={`/img/${from.token.img}.svg`} alt={`${from.token.name} Logo`} /> {from.token.name}
            </span>
          </span>
          <span className="transaction-arrow d-flex flex-grow-1 justify-content-center">
            <i className="fa-light fa-arrows-repeat d-block d-lg-none"></i>
            <i className="fa-light fa-arrow-right-long d-none d-lg-block"></i>
          </span>
          <span className="to-transaction d-flex flex-grow-1 justify-content-end">
            <span className="blockchain-fees">
              <img src={`/img/${to.blockchain.img}.svg`} alt={`${to.blockchain.name} Logo`} />
              {to.blockchain.name}: <strong>{to.amount}</strong>{' '}
            </span>
            <span className="token-fees">
              <img src={`/img/${to.token.img}.svg`} alt={`${to.token.name} Logo`} /> {to.token.name}
            </span>
          </span>
        </p>
      </a>
      <div id={sender} className={`collapse ${open && 'show'}`}>
        <div className="card">
          <div className="card-body">
            <span className="transaction-details">
              Sender: <strong>{sender}</strong>
            </span>
            <span className="transaction-details">
              Receiver: <strong>{receiver}</strong>
            </span>
            <span className="fees-details">
              Validators refund: <strong>{validatorFee.amount}</strong>{' '}
              <span className="token-fees">
                <img src={`/img/${validatorFee.token.img}.svg`} alt={`${validatorFee.token.name} Logo`} />{' '}
                {validatorFee.token.name}
              </span>
            </span>
            <span className="fees-details">
              Liquidity Fee: <strong>{liquidityFee.amount}</strong>{' '}
              <span className="token-fees">
                <img src={`/img/${liquidityFee.token.img}.svg`} alt={`${liquidityFee.token.name} Logo`} />{' '}
                {liquidityFee.token.name}
              </span>
            </span>
            <span className="success-status">
              Status: <strong>{status}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionElement;
