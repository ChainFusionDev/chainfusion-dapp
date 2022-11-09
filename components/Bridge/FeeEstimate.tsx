import { Token } from '@src/types';
import { BigNumber, utils } from 'ethers';
import { useState } from 'react';

interface FeeEstimateProps {
  token: Token;
  validatorsFee: BigNumber;
  liquidityFee: BigNumber;
  isEstimating: boolean;
}

const FeeEstimate = ({ token, validatorsFee, liquidityFee, isEstimating }: FeeEstimateProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalFeeString = utils.formatUnits(validatorsFee.add(liquidityFee), token.decimals);
  const validatorsFeeString = utils.formatUnits(validatorsFee, token.decimals);
  const liquidityFeeString = utils.formatUnits(liquidityFee, token.decimals);

  return (
    <div className="fees-alert mb-2">
      <span
        data-toggle="collapse"
        role="button"
        aria-expanded={isOpen}
        aria-controls="feesAlert"
        className="btn-block py-2 with-chevron user-select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="d-flex align-items-center justify-content-between mb-0 px-3 py-2">
          <span className="title-panel">
            Fees: <strong>{isEstimating ? '...' : totalFeeString}</strong>{' '}
            <span className="token-fees">
              <img className="chain-icon-sm" src={`/img/${token.identifier}.svg`} alt={token.name} />
              {` ${token.symbol}`}
            </span>
          </span>
          <i className={`fa-regular ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </p>
      </span>
      <div className={`collapse ${isOpen ? 'show' : ''}`}>
        <div className="card">
          <div className="card-body">
            <span className="fees-details">
              Validators Refund: <strong>{isEstimating ? '...' : validatorsFeeString}</strong>{' '}
              <span className="token-fees">
                <img className="chain-icon-sm" src={`/img/${token.identifier}.svg`} alt={token.name} />
                {` ${token.symbol}`}
              </span>
            </span>
            <span className="fees-details">
              Liquidity Fee: <strong>{isEstimating ? '...' : liquidityFeeString}</strong>{' '}
              <span className="token-fees">
                <img className="chain-icon-sm" src={`/img/${token.identifier}.svg`} alt={token.name} />
                {` ${token.symbol}`}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeEstimate;
