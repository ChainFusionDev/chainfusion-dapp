import { getNativeChain } from '@src/config';
import { ValidatorInfo } from '@src/types';
import { utils } from 'ethers';

export const StakingHeader = () => {
  return (
    <div className="staking-table-title d-flex">
      <div className="rank pr-2">Rank</div>
      <div className="wallet pl-4 flex-grow-1">Validator</div>
      <div className="amount pl-5 pr-4">Stake</div>
    </div>
  );
};

export interface StakingItemProps {
  rank: number;
  data: ValidatorInfo;
}

export const StakingItem = ({ rank, data }: StakingItemProps) => {
  const nativeChain = getNativeChain();

  const getAddressUrl = (address: string) => {
    return new URL(`/address/${address}`, nativeChain.explorer).href;
  };

  const getShortValidator = (tx: string) => {
    const visibleCharacters = 16;
    return `${tx.substring(0, 2 + visibleCharacters)}...${tx.substring(tx.length - visibleCharacters)}`;
  };

  return (
    <div className="staking-table-tr d-flex">
      <div className="rank pr-md-3">
        <p className="d-block d-sm-block d-md-none">Rank:</p>&nbsp;
        {rank}
      </div>
      <div className="wallet pl-md-4 flex-grow-1">
        <p className="d-block d-sm-block d-md-none">Validator:</p>
        <a href={getAddressUrl(data.validator)} target="_blank" rel="noreferrer">
          <span className="d-block d-sm-none">{getShortValidator(data.validator)}</span>
          <span className="d-none d-sm-block">{data.validator}</span>
        </a>
        <span
          className="copy-token-icon d-none d-md-block"
          data-toggle="tooltip"
          data-tip
          data-for="transaction-copy"
        ></span>
      </div>
      <div className="amount pl-md-4 pr-md-6">
        <p className="d-block d-sm-block d-md-none">Stake:</p>&nbsp;
        {utils.formatEther(data.stake)}
        {` ${nativeChain.nativeCurrency.symbol}`}
      </div>
    </div>
  );
};

export const SkeletonStakingItem = () => {
  return (
    <div className="staking-table-tr d-flex">
      <div className="rank pr-md-3">
        <div className="skeleton">
          <div className="avatar-skeleton"></div>
        </div>
      </div>
      <div className="wallet pl-md-4 flex-grow-1">
        <div className="skeleton mt-2 mt-md-0 pr-md-4">
          <div className="line-skeleton"></div>
          <div className="line-skeleton"></div>
        </div>
      </div>
      <div className="amount pl-md-4 pr-md-6 d-none d-md-block">
        <div className="skeleton">
          <div className="line-skeleton"></div>
          <div className="line-skeleton"></div>
        </div>
      </div>
    </div>
  );
};
