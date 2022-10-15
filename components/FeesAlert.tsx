import React from 'react';

const FeesAlert = () => {
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
              <img src="/img/usdt.svg" alt="USDT Logo" /> USDT
            </span>
          </span>
          <i className={`fa-regular ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </p>
      </span>
      <div className={`collapse ${isOpen ? 'show' : ''}`}>
        <div className="card">
          <div className="card-body">
            <span className="fees-details">
              Validators refund: <strong>0.3</strong>{' '}
              <span className="token-fees">
                <img src="/img/usdt.svg" alt="USDT Logo" /> USDT
              </span>
            </span>
            <span className="fees-details">
              Liquidity Fee: <strong>0.2</strong>{' '}
              <span className="token-fees">
                <img src="/img/usdt.svg" alt="USDT Logo" /> USDT
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesAlert;
