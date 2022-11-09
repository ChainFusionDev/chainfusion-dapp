import { getChain, getNativeChain, getToken } from '@src/config';
import { TransactionHistoryItem } from '@src/types';
import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

export interface TransactionItemProps {
  item: TransactionHistoryItem;
}

const TransactionItem = ({ item }: TransactionItemProps) => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const fromChain = getChain(item.from.chain);
  const fromToken = getToken(item.from.token);

  const toChain = getChain(item.to.chain);
  const toToken = getToken(item.to.token);

  const nativeChain = getNativeChain();
  const senderChain = getChain(item.from.chain);
  const receiverChain = getChain(item.to.chain);

  const getAddressUrl = (address: string) => {
    return new URL(`/address/${address}`, nativeChain.explorer).href;
  };

  const getSenderTxUrl = (tx: string) => {
    return new URL(`/transaction/${tx}`, senderChain.explorer).href;
  };

  const getReceiverTxUrl = (tx: string) => {
    return new URL(`/transaction/${tx}`, receiverChain.explorer).href;
  };

  const getShortTx = (tx: string) => {
    const visibleCharacters = 18;
    return `${tx.substring(0, 2 + visibleCharacters)}...${tx.substring(tx.length - visibleCharacters)}`;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (fromChain === undefined || fromToken === undefined || toChain === undefined || toToken === undefined) {
    return <></>;
  }

  return (
    <div className="transfer-block mb-2">
      <a
        data-toggle="collapse"
        role="button"
        aria-expanded={open}
        aria-controls={item.sender}
        className="btn-block py-2 with-chevron"
        onClick={() => setOpen(!open)}
      >
        <p className="transaction-info mb-0 px-3 py-2 d-flex align-items-center">
          <span>
            <i className={`fa-regular ${open ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </span>
          <span className="from-transaction d-flex flex-grow-1 justify-content-start">
            <span className="blockchain-fees">
              <img src={`/img/${fromChain.identifier}.svg`} alt={`${fromChain.name} Logo`} />
              &nbsp;
              {fromChain.name}: <strong>{item.from.amount}</strong>&nbsp;
            </span>
            <span className="token-fees">
              <img src={`/img/${fromToken.identifier}.svg`} alt={`${fromToken.name} Logo`} /> {fromToken.name}
            </span>
          </span>
          <span className="transaction-arrow d-flex flex-grow-1 justify-content-center">
            <i className="fa-light fa-arrows-repeat d-block d-xl-none"></i>
            <i className="fa-light fa-arrow-right-long d-none d-xl-block"></i>
          </span>
          <span className="to-transaction d-flex flex-grow-1 justify-content-end">
            <span className="blockchain-fees">
              <img src={`/img/${toChain.identifier}.svg`} alt={`${toChain.name} Logo`} />
              &nbsp;
              {toChain.name}: <strong>{item.to.amount}</strong>&nbsp;
            </span>
            <span className="token-fees">
              <img src={`/img/${toToken.identifier}.svg`} alt={`${toToken.name} Logo`} /> {toToken.name}
            </span>
          </span>
        </p>
      </a>
      <div id={item.sender} className={`collapse ${open && 'show'}`}>
        <div className="card">
          <div className="card-body">
            <span className="transaction-details">
              Sender:{' '}
              <a href={getAddressUrl(item.sender)} target="_blank" rel="noreferrer">
                {item.sender}
              </a>
              <span className="copy-token-icon" data-toggle="tooltip" data-tip data-for="transaction-copy"></span>
            </span>
            <span className="transaction-details">
              Receiver:{' '}
              <a href={getAddressUrl(item.receiver)} target="_blank" rel="noreferrer">
                {item.receiver}
              </a>
              <span className="copy-token-icon" data-toggle="tooltip" data-tip data-for="transaction-copy"></span>
            </span>
            <span className="transaction-details">
              Sender Tx:{' '}
              <a href={getSenderTxUrl(item.senderTx)} target="_blank" rel="noreferrer">
                {getShortTx(item.senderTx)}
              </a>
              <span className="copy-token-icon" data-toggle="tooltip" data-tip data-for="transaction-copy"></span>
            </span>
            <span className="transaction-details">
              Receiver Tx:{' '}
              <a href={getReceiverTxUrl(item.receiverTx)} target="_blank" rel="noreferrer">
                {getShortTx(item.receiverTx)}
              </a>
              <span className="copy-token-icon" data-toggle="tooltip" data-tip data-for="transaction-copy"></span>
            </span>
            <span className="fees-details">
              Validators Refund: <strong>{item.validatorFee}</strong>&nbsp;
              <span className="token-fees">
                <img src={`/img/${fromToken.identifier}.svg`} alt={`${fromToken.name} Logo`} />
                &nbsp;
                {fromToken.name}
              </span>
            </span>
            <span className="fees-details">
              Liquidity Fee: <strong>{item.liquidityFee}</strong>&nbsp;
              <span className="token-fees">
                <img src={`/img/${fromToken.identifier}.svg`} alt={`${fromToken.name} Logo`} />
                &nbsp;
                {fromToken.name}
              </span>
            </span>
            <span className="success-status">
              Status: <strong>{item.status}</strong>
            </span>
          </div>
        </div>
      </div>
      {isMounted && (
        <ReactTooltip
          id="transaction-copy"
          className="standart-tooltip"
          type="light"
          effect="solid"
          offset={{ top: 0, right: 0, left: 0, bottom: 0 }}
          border={true}
        >
          Copy to clipboard
        </ReactTooltip>
      )}
    </div>
  );
};

export default TransactionItem;
