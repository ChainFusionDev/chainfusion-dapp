import Layout from '@components/Layout';
import FeeEstimate from '@components/FeeEstimate';
import TransactionHistory from 'pages/bridge/Transaction/TransactionHistory';
import React, { useState } from 'react';
import SelectChainTokenModal from '@components/Modals/SelectChainTokenModal';
import OptionsModal from '@components/Modals/OptionsModal';
import TransferModal from '@components/Modals/TransferModal';
import { Chain, supportedChains, supportedTokens, Token } from '@src/config';

const Bridge = () => {
  const [showFromModal, setShowFromModal] = React.useState(false);
  const [showToModal, setShowToModal] = React.useState(false);
  const [showOptionsModal, setShowOptionsModal] = React.useState(false);
  const [showTransferModal, setShowTransferModal] = React.useState(false);

  const [from, setFrom] = React.useState<number>(0.0);
  const [to, setTo] = React.useState<number>(0.0);
  const [swap, setSwap] = React.useState(false);

  const chains = supportedChains();
  const tokens = supportedTokens();

  const [chainFrom, setChainFrom] = useState<Chain>(chains[0]);
  const [tokenFrom, setTokenFrom] = useState<Token>(tokens[0]);

  const [chainTo, setChainTo] = useState<Chain>(chains[1]);
  const [tokenTo, setTokenTo] = useState<Token>(tokens[0]);

  const swapFromTo = () => {
    setFrom(to);
    setChainFrom(chainTo);
    setTokenFrom(tokenTo);

    setTo(from);
    setChainTo(chainFrom);
    setTokenTo(tokenFrom);

    setSwap(!swap);
  };

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
                    <img className="chain-icon-sm" src={`/img/${chainFrom.identifier}.svg`} alt={chainFrom.name} />
                    {` ${chainFrom.name}`}
                  </span>
                  <span className="token-label">
                    <img className="chain-icon-sm" src={`/img/${tokenFrom.identifier}.svg`} alt={tokenFrom.name} />
                    {` ${tokenFrom.symbol}`}
                  </span>
                  <i className="fa-light fa-chevron-down"></i>
                </div>
                <input
                  type="number"
                  className="form-control"
                  id="from-amount"
                  placeholder="0.0000"
                  value={from === 0.0 ? '' : from}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFrom(parseInt(e.target.value))}
                />
              </div>
              <span className={`change-token ${swap ? 'swap' : ''}`} onClick={swapFromTo}>
                <i className="fa-regular fa-arrow-up-arrow-down"></i>
              </span>
              <div className="form-group form-block">
                <span className="token-amount">To:</span>
                <div className="select-token" onClick={() => setShowToModal(true)}>
                  <span className="blockchanin-label send-to">
                    <img className="chain-icon-sm" src={`/img/${chainTo.identifier}.svg`} alt={chainTo.name} />
                    {` ${chainTo.name}`}
                  </span>
                  <span className="token-label">
                    <img className="chain-icon-sm" src={`/img/${tokenTo.identifier}.svg`} alt={tokenTo.name} />
                    {` ${tokenTo.symbol}`}
                  </span>
                  <i className="fa-light fa-chevron-down"></i>
                </div>
                <input
                  type="number"
                  className="form-control"
                  id="to-amount"
                  value={to === 0.0 ? '' : to}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTo(parseInt(e.target.value));
                  }}
                  placeholder="0.0000"
                />
              </div>

              <FeeEstimate token={tokenFrom} validatorsFee={0.3} liquidityFee={0.2} />

              <button className="transfer-button" onClick={() => setShowTransferModal(true)}>
                <i className="fa-regular fa-shuffle"></i> Transfer
              </button>
            </div>
          </div>
          <TransactionHistory />
        </div>
      </div>

      <SelectChainTokenModal
        key={`from:${chainFrom.identifier}:${tokenFrom.identifier}`}
        title="From"
        initialChain={chainFrom}
        initialToken={tokenFrom}
        show={showFromModal}
        close={() => setShowFromModal(false)}
        select={(chain: Chain, token: Token) => {
          // Avoid selecting same from and to chains
          if (chainTo.identifier == chain.identifier) {
            setChainTo(chainFrom);
          }

          setChainFrom(chain);
          setTokenFrom(token);

          // Currently we support transferring only same tokens on both chains
          setTokenTo(token);
        }}
      />

      <SelectChainTokenModal
        key={`to:${chainTo.identifier}:${tokenTo.identifier}`}
        title="To"
        initialChain={chainTo}
        initialToken={tokenTo}
        show={showToModal}
        close={() => setShowToModal(false)}
        select={(chain: Chain, token: Token) => {
          // Avoid selecting same from and to chains
          if (chainFrom.identifier == chain.identifier) {
            setChainFrom(chainTo);
          }

          setChainTo(chain);
          setTokenTo(token);

          // Currently we support transferring only same tokens on both chains
          setTokenFrom(token);
        }}
      />

      <OptionsModal show={showOptionsModal} close={() => setShowOptionsModal(false)} />
      <TransferModal show={showTransferModal} close={() => setShowTransferModal(false)} />
    </Layout>
  );
};

export default Bridge;
