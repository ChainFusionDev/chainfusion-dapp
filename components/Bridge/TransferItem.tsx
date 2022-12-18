import { BridgeTransfer } from '@src/types';
import { getAddressLink, trimDecimals } from '@src/utils';
import { utils } from 'ethers';
import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

export interface TransferItemProps {
  transfer: BridgeTransfer;
}

export const TransferItem = ({ transfer }: TransferItemProps) => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const amountFrom = transfer.amount.add(transfer.fee);
  const amountTo = transfer.amount;

  return (
    <div className="transfer-block mb-2">
      <a
        data-toggle="collapse"
        role="button"
        aria-expanded={open}
        aria-controls={transfer.sender}
        className="btn-block with-chevron py-2"
        onClick={() => setOpen(!open)}
      >
        <p className="transaction-info mb-0 px-3 py-2 d-flex align-items-center">
          <span>
            <i className={`fa-regular ${open ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </span>
          <span className="from-transaction d-flex flex-grow-1 justify-content-start">
            <span className="blockchain-fees">
              <img src={`/img/${transfer.fromChain.identifier}.svg`} alt={`${transfer.fromChain.name} Logo`} />
              &nbsp;
              {transfer.fromChain.name}:{' '}
              <strong>
                {utils.formatUnits(trimDecimals(amountFrom, transfer.token.decimals, 4), transfer.token.decimals)}
              </strong>
              &nbsp;
            </span>
            <span className="token-fees">
              <img src={`/img/${transfer.token.identifier}.svg`} alt={`${transfer.token.name} Logo`} />{' '}
              {transfer.token.name}
            </span>
          </span>
          <span className="transaction-arrow d-flex flex-grow-1 justify-content-center">
            <i className="fa-light fa-arrows-repeat d-block d-xl-none"></i>
            <i className="fa-light fa-arrow-right-long d-none d-xl-block"></i>
          </span>
          <span className="to-transaction d-flex flex-grow-1 justify-content-end">
            <span className="blockchain-fees">
              <img src={`/img/${transfer.toChain.identifier}.svg`} alt={`${transfer.toChain.name} Logo`} />
              &nbsp;
              {transfer.toChain.name}:{' '}
              <strong>
                {utils.formatUnits(trimDecimals(amountTo, transfer.token.decimals, 4), transfer.token.decimals)}
              </strong>
              &nbsp;
            </span>
            <span className="token-fees">
              <img src={`/img/${transfer.token.identifier}.svg`} alt={`${transfer.token.name} Logo`} />{' '}
              {transfer.token.name}
            </span>
          </span>
        </p>
      </a>
      <div id={transfer.sender} className={`transfer-block-content ${open ? '' : 'slide-out'}`}>
        <div className="card">
          <div className="card-body">
            <span className="transaction-details">
              Sender:{' '}
              <a href={getAddressLink(transfer.fromChain, transfer.sender)} target="_blank" rel="noreferrer">
                {transfer.sender}
              </a>
              <span className="copy-token-icon" data-toggle="tooltip" data-tip data-for="transaction-copy"></span>
            </span>
            <span className="transaction-details">
              Receiver:{' '}
              <a href={getAddressLink(transfer.toChain, transfer.receiver)} target="_blank" rel="noreferrer">
                {transfer.receiver}
              </a>
              <span className="copy-token-icon" data-toggle="tooltip" data-tip data-for="transaction-copy"></span>
            </span>
            <span className="success-status">
              Status: <strong>Success</strong>
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

export const SkeletonTransferItem = () => {
  return (
    <div className="transfer-block-loading mb-2">
      <div className="skeleton mt-2 mt-md-0">
        <div className="line-skeleton"></div>
        <div className="line-skeleton"></div>
      </div>
    </div>
  );
};
