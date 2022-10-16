import Layout from '../components/Layout';
import FeesAlert from '../components/FeesAlert';
import Transaction from '../components/Transaction/Transaction';
import React from 'react';
import SelectChainTokenModal from '../components/Modals/SelectChainTokenModal';
import OptionsModal from '../components/Modals/OptionsModal';
import TransferModal from '../components/Modals/TransferModal';

const Bridge = () => {
  const [showFromModal, setShowFromModal] = React.useState(false);
  const [showToModal, setShowToModal] = React.useState(false);
  const [showOptionsModal, setShowOptionsModal] = React.useState(false);
  const [showTransferModal, setShowTransferModal] = React.useState(false);

  const [from, setFrom] = React.useState<number>(0.0);
  const [to, setTo] = React.useState<number>(0.0);

  return (
    <Layout
      module="bridge"
      title="Bridge"
      description="Bridge allows you to transfer assets between different blockchain in a safe and decentralized way"
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className="form-bridge">
              <i className="fa-light fa-gear setting-receiver" onClick={() => setShowOptionsModal(true)}></i>
              <div className="mx-auto logo">
                <img src="/img/logo.svg" alt="ChainFusion logo" className="img-fluid d-block d-sm-block" />
              </div>
              <div className="form-group form-block">
                <span className="token-amount">From:</span>
                <div className="select-token" onClick={() => setShowFromModal(true)}>
                  <span className="blockchanin-label send-from">
                    <img src="/img/ethereum.svg" alt="Ethereum Logo" /> Ethereum
                  </span>
                  <span className="token-label">
                    <img src="/img/usdt.svg" alt="USDT Logo" /> USDT
                  </span>
                  <i className="fa-light fa-chevron-down"></i>
                </div>
                <input
                  type="number"
                  className="form-control roundedInput"
                  id="from-amount"
                  placeholder="0.0000"
                  value={from === 0.0 ? '' : from}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFrom(parseInt(e.target.value))}
                />
              </div>
              <span className="change-token">
                <i className="fa-regular fa-arrow-up-arrow-down"></i>
              </span>
              <div className="form-group form-block">
                <span className="token-amount">To:</span>
                <div className="select-token" onClick={() => setShowToModal(true)}>
                  <span className="blockchanin-label send-to">
                    <img src="/img/avalanche.svg" alt="Avalanche Logo" /> Avalanche
                  </span>
                  <span className="token-label">
                    <img src="/img/usdt.svg" alt="USDT Logo" /> USDT
                  </span>
                  <i className="fa-light fa-chevron-down"></i>
                </div>
                <input
                  type="number"
                  className="form-control roundedInput"
                  id="to-amount"
                  value={to === 0.0 ? '' : to}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTo(parseInt(e.target.value));
                  }}
                  placeholder="0.0000"
                />
              </div>

              <FeesAlert />

              <button className="transfer-button" onClick={() => setShowTransferModal(true)}>
                <i className="fa-regular fa-shuffle"></i> Transfer
              </button>
            </div>
          </div>
          <Transaction />
        </div>
      </div>

      <SelectChainTokenModal title="From" show={showFromModal} close={() => setShowFromModal(false)} />
      <SelectChainTokenModal title="To" show={showToModal} close={() => setShowToModal(false)} />
      <OptionsModal show={showOptionsModal} close={() => setShowOptionsModal(false)} />
      <TransferModal show={showTransferModal} close={() => setShowTransferModal(false)} />
    </Layout>
  );
};

export default Bridge;
