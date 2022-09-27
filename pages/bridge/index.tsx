import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import FeesAlert from "../../components/FeesAlert";
import Transaction from "../../components/Transaction";

function Bridge() {
  return (
    <div className="page">
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Chainfusion | Bridge</title>
        <meta name="description" content="Bridge" />
        <link
          rel="icon"
          href="/img/favicon.svg"
          sizes="any"
          type="image/svg+xml"
        />
      </Head>

      <main>
        <Navbar />

        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <div className="form-bridge">
                <i
                  className="fa-light fa-gear setting-receiver"
                  data-toggle="modal"
                  data-target="#modalReceiver"
                ></i>
                <img
                  src="/img/logo.svg"
                  className="img-fluid logo mx-auto d-block d-sm-block"
                />
                <form>
                  <div className="form-group form-block">
                    <span className="token-amount">From:</span>
                    <div
                      className="select-token"
                      data-toggle="modal"
                      data-target="#modalFromSelect"
                    >
                      <span className="blockchanin-label send-from">
                        <img src="/img/ethereum.svg" /> Ethereum
                      </span>
                      <span className="token-label">
                        <img src="/img/usdt.svg" /> USDT
                      </span>
                      <i className="fa-light fa-chevron-down"></i>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="from-amount"
                      placeholder="0.0000"
                    />
                  </div>
                  <span className="change-token">
                    <i className="fa-regular fa-arrow-up-arrow-down"></i>
                  </span>
                  <div className="form-group form-block">
                    <span className="token-amount">To:</span>
                    <div
                      className="select-token"
                      data-toggle="modal"
                      data-target="#modalToSelect"
                    >
                      <span className="blockchanin-label send-to">
                        <img src="/img/avalanche.svg" /> Avalanche
                      </span>
                      <span className="token-label">
                        <img src="/img/usdt.svg" /> USDT
                      </span>
                      <i className="fa-light fa-chevron-down"></i>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="to-amount"
                      placeholder="0.0000"
                    />
                  </div>

                  <FeesAlert />

                  <button
                    type="submit"
                    data-toggle="modal"
                    data-target="#modalTransferProgress"
                  >
                    <i className="fa-regular fa-shuffle"></i> Transfer
                  </button>
                </form>
              </div>
            </div>

            <Transaction />
          </div>
        </div>

        <Modal />
      </main>
    </div>
  );
}

export default Bridge;
