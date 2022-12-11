import { getChainById, getTokenByChainIdentifierAndAddress } from '@src/config';
import { useChainContext } from '@src/context/ChainContext';
import { Chain, Token } from '@src/types';
import { BigNumber, utils } from 'ethers';
import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

export interface ChainHistoryItem {
  hash: string;
  sender: string;
  receiver: string;
  fromChain: Chain;
  toChain: Chain;
  token: Token;
  amount: BigNumber;
  fee: BigNumber;
}

export interface EventRegistered {
  _hash: string;
  _appContract: string;
  _sourceChain: BigNumber;
  _destinationChain: BigNumber;
  _data: string;
  _validatorFee: BigNumber;
  _eventType: number;
}

export interface TransactionItemProps {
  event: EventRegistered;
}

export const TransactionItem = ({ event }: TransactionItemProps) => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [item, setItem] = useState<ChainHistoryItem | undefined>(undefined);

  const { networkContainer } = useChainContext();

  const fromChain = getChainById(event._sourceChain.toNumber());
  const toChain = getChainById(event._destinationChain.toNumber());
  const fromNetwork = networkContainer[fromChain?.identifier];
  const toNetwork = networkContainer[toChain?.identifier];

  const getSenderAddressUrl = (address: string) => {
    return new URL(`/address/${address}`, fromChain.explorer).href;
  };

  const getReceiverAddressUrl = (address: string) => {
    return new URL(`/address/${address}`, toChain.explorer).href;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const loadItem = async () => {
      if (fromNetwork?.contracts === undefined || toNetwork?.contracts === undefined) {
        return;
      }

      const data = await fromNetwork.contracts.relayBridge.sentData(event._hash);
      const item = decodeChainHistoryItem(event._hash, fromNetwork.chain, toNetwork.chain, data);
      if (item !== undefined) {
        setItem(item);
      }
    };

    loadItem();
  }, [networkContainer, event, fromNetwork, toNetwork]);

  if (item === undefined) {
    return <SkeletonTransactionItem />;
  }

  const amountFrom = item.amount.add(item.fee);
  const amountTo = item.amount;

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
              <img src={`/img/${item.fromChain.identifier}.svg`} alt={`${item.fromChain.name} Logo`} />
              &nbsp;
              {item.fromChain.name}: <strong>{utils.formatUnits(amountFrom, item.token.decimals)}</strong>&nbsp;
            </span>
            <span className="token-fees">
              <img src={`/img/${item.token.identifier}.svg`} alt={`${item.token.name} Logo`} /> {item.token.name}
            </span>
          </span>
          <span className="transaction-arrow d-flex flex-grow-1 justify-content-center">
            <i className="fa-light fa-arrows-repeat d-block d-xl-none"></i>
            <i className="fa-light fa-arrow-right-long d-none d-xl-block"></i>
          </span>
          <span className="to-transaction d-flex flex-grow-1 justify-content-end">
            <span className="blockchain-fees">
              <img src={`/img/${item.toChain.identifier}.svg`} alt={`${item.toChain.name} Logo`} />
              &nbsp;
              {item.toChain.name}: <strong>{utils.formatUnits(amountTo, item.token.decimals)}</strong>&nbsp;
            </span>
            <span className="token-fees">
              <img src={`/img/${item.token.identifier}.svg`} alt={`${item.token.name} Logo`} /> {item.token.name}
            </span>
          </span>
        </p>
      </a>
      <div id={item.sender} className={`collapse ${open && 'show'}`}>
        <div className="card">
          <div className="card-body">
            <span className="transaction-details">
              Sender:{' '}
              <a href={getSenderAddressUrl(item.sender)} target="_blank" rel="noreferrer">
                {item.sender}
              </a>
              <span className="copy-token-icon" data-toggle="tooltip" data-tip data-for="transaction-copy"></span>
            </span>
            <span className="transaction-details">
              Receiver:{' '}
              <a href={getReceiverAddressUrl(item.receiver)} target="_blank" rel="noreferrer">
                {item.receiver}
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

export const SkeletonTransactionItem = () => {
  return (
    <div className="transfer-block-loading mb-2">
      <div className="skeleton mt-2 mt-md-0">
        <div className="line-skeleton"></div>
        <div className="line-skeleton"></div>
      </div>
    </div>
  );
};

export const decodeChainHistoryItem = (
  hash: string,
  fromChain: Chain,
  toChain: Chain,
  data: utils.BytesLike
): ChainHistoryItem | undefined => {
  try {
    const result = utils.defaultAbiCoder.decode(
      ['uint256', 'address', 'address', 'uint256', 'address', 'uint256', 'uint256'],
      data
    );

    const token = getTokenByChainIdentifierAndAddress(fromChain.identifier, result[2] as string);
    if (token === undefined) {
      return undefined;
    }

    const item: ChainHistoryItem = {
      hash: hash,
      sender: result[1] as string,
      receiver: result[4] as string,
      fromChain: fromChain,
      toChain: toChain,
      token: token,
      amount: result[5] as BigNumber,
      fee: result[6] as BigNumber,
    };

    return item;
  } catch (e) {
    return undefined;
  }
};
