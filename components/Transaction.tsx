const Transaction = () => {
  return (
    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mb-5">
      <div className="title-block">Previous Transfers</div>

      <div className="transfer-block mb-2">
        <a
          data-toggle="collapse"
          href="#oneTransaction"
          role="button"
          aria-expanded="false"
          aria-controls="oneTransaction"
          className="btn-block py-2 with-chevron"
        >
          <p className="transaction-info mb-0 px-3 py-2 d-flex align-items-center">
            <span>
              <i className="fa-regular fa-chevron-down"></i>
            </span>
            <span className="from-transaction d-flex flex-grow-1 justify-content-start">
              <span className="blockchain-fees ml-2">
                <img src="/img/binance.svg" /> BSC: <strong>0.5</strong>{" "}
              </span>
              <span className="token-fees">
                <img src="/img/usdt.svg" /> USDT
              </span>
            </span>
            <span className="transaction-arrow d-flex flex-grow-1 justify-content-center">
              <i className="fa-light fa-arrows-repeat d-block d-lg-none"></i>
              <i className="fa-light fa-arrow-right-long d-none d-lg-block"></i>
            </span>
            <span className="to-transaction d-flex flex-grow-1 justify-content-end">
              <span className="blockchain-fees">
                <img src="/img/ethereum.svg" /> Ethereum: <strong>148</strong>{" "}
              </span>
              <span className="token-fees">
                <img src="/img/usdc.svg" /> USDC
              </span>
            </span>
          </p>
        </a>
        <div id="oneTransaction" className="collapse">
          <div className="card">
            <div className="card-body">
              <span className="transaction-details">
                Sender: <strong>1BvBv5SEYstW9qTxFn5A4GFg7xJaNVN2</strong>
              </span>
              <span className="transaction-details">
                Receiver: <strong>1v85vcS38stC2JbxXn3A6Hv2aU9BRz38</strong>
              </span>
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
              <span className="success-status">
                Status: <strong>Successfully</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="transfer-block mb-2">
        <a
          data-toggle="collapse"
          href="#twoTransaction"
          role="button"
          aria-expanded="false"
          aria-controls="twoTransaction"
          className="btn-block py-2 with-chevron"
        >
          <p className="transaction-info mb-0 px-3 py-2 d-flex align-items-center">
            <span>
              <i className="fa-regular fa-chevron-down"></i>
            </span>
            <span className="from-transaction d-flex flex-grow-1 justify-content-start">
              <span className="blockchain-fees ml-2">
                <img src="/img/binance.svg" /> BSC: <strong>0.3</strong>{" "}
              </span>
              <span className="token-fees">
                <img src="/img/usdt.svg" /> USDT
              </span>
            </span>
            <span className="transaction-arrow d-flex flex-grow-1 justify-content-center">
              <i className="fa-light fa-arrows-repeat d-block d-lg-none"></i>
              <i className="fa-light fa-arrow-right-long d-none d-lg-block"></i>
            </span>
            <span className="to-transaction d-flex flex-grow-1 justify-content-end">
              <span className="blockchain-fees">
                <img src="/img/polygon.svg" /> Polygon: <strong>235</strong>{" "}
              </span>
              <span className="token-fees">
                <img src="/img/DAI.svg" /> DAI
              </span>
            </span>
          </p>
        </a>
        <div id="twoTransaction" className="collapse">
          <div className="card">
            <div className="card-body">
              <span className="transaction-details">
                Sender: <strong>1BvBv5SEYstW9qTxFn5Au4m4FgJaNVN2</strong>
              </span>
              <span className="transaction-details">
                Receiver: <strong>1v85vcS38stC2JbxXn3Au6B6aU9BRz38</strong>
              </span>
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
              <span className="success-status">
                Status: <strong>Successfully</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4 mb-2">
        <a href="#" className="loadmore-btn">
          Load more
        </a>
      </div>
    </div>
  );
};

export default Transaction;
