const FeesAlert = () => {
  return (
    <div className="fees-alert mb-2">
      <a
        data-toggle="collapse"
        href="#feesAlert"
        role="button"
        aria-expanded="true"
        aria-controls="feesAlert"
        className="btn-block py-2 with-chevron"
      >
        <p className="d-flex align-items-center justify-content-between mb-0 px-3 py-2">
          <span className="title-panel">
            Fees: <strong>0.5</strong>{" "}
            <span className="token-fees">
              <img src="/img/usdt.svg" /> USDT
            </span>
          </span>
          <i className="fa-regular fa-chevron-down"></i>
        </p>
      </a>
      <div id="feesAlert" className="collapse show">
        <div className="card">
          <div className="card-body">
            <span className="fees-details">
              Validators refund: <strong>0.3</strong>{" "}
              <span className="token-fees">
                <img src="/img/usdt.svg" /> USDT
              </span>
            </span>
            <span className="fees-details">
              Liquidity Fee: <strong>0.2</strong>{" "}
              <span className="token-fees">
                <img src="/img/usdt.svg" /> USDT
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesAlert;
