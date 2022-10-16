import { Token } from '@src/config';
import React from 'react';

interface FeeEstimateProps {
  token: Token;
  validatorsFee: number;
  liquidityFee: number;
}

const FeeEstimate = ({ token, validatorsFee, liquidityFee }: FeeEstimateProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

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
            Fees: <strong>0.5</strong>{' '}
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
              Validators refund: <strong>{validatorsFee}</strong>{' '}
              <span className="token-fees">
                <img className="chain-icon-sm" src={`/img/${token.identifier}.svg`} alt={token.name} />
                {` ${token.symbol}`}
              </span>
            </span>
            <span className="fees-details">
              Liquidity Fee: <strong>{liquidityFee}</strong>{' '}
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
