import Layout from '@components/Layout';
import FeeEstimate from '@components/FeeEstimate';
import TransactionHistory from '@components/Bridge/TransactionHistory';
import React from 'react';
import SelectChainTokenModal from '@components/Modals/SelectChainTokenModal';
import OptionsModal from '@components/Modals/OptionsModal';
import TransferModal from '@components/Modals/TransferModal';
import { Chain, supportedChains, supportedTokens, Token } from '@src/config';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { useWeb3React } from '@web3-react/core';
import { useChainContext } from '@src/context/ChainContext';

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

  const [chainFromLocal, setChainFrom] = useLocalStorage<Chain>('chain-from');
  const [tokenFromLocal, setTokenFrom] = useLocalStorage<Token>('token-from');

  const [chainToLocal, setChainTo] = useLocalStorage<Chain>('chain-to');
  const [tokenToLocal, setTokenTo] = useLocalStorage<Token>('token-to');

  const chainFrom = chainFromLocal ?? chains[0];
  const tokenFrom = tokenFromLocal ?? tokens[0];

  const chainTo = chainToLocal ?? chains[1];
  const tokenTo = tokenToLocal ?? tokens[0];

  const { connector, isActive, chainId } = useWeb3React();
  const { showConnectWalletDialog } = useChainContext();

  const swapFromTo = () => {
    setFrom(to);
    setChainFrom(chainTo);
    setTokenFrom(tokenTo);

    setTo(from);
    setChainTo(chainFrom);
    setTokenTo(tokenFrom);

    setSwap(!swap);
  };

  const switchNetwork = async (chain: Chain) => {
    const chainParams = {
      chainId: chain.chainId.toString(16),
      chainName: chain.name,
      nativeCurrency: chain.nativeCurrency,
      rpcUrls: [chain.rpc],
      blockExplorerUrls: [chain.explorer],
    };

    await connector.activate(chainParams);
  };

  let transferButton = (
    <button className="transfer-button" onClick={showConnectWalletDialog}>
      <i className="fa-regular fa-wallet"></i> Connect Wallet
    </button>
  );

  if (isActive) {
    if (chainId !== chainFrom.chainId) {
      transferButton = (
        <button className="transfer-button" onClick={() => switchNetwork(chainFrom)}>
          <i className="fa-regular fa-shuffle"></i> Switch Network to{' '}
          <img className="chain-icon-sm" src={`/img/${chainFrom.identifier}.svg`} alt={chainFrom.name} />{' '}
          {chainFrom.name}
        </button>
      );
    } else {
      transferButton = (
        <button className="transfer-button" onClick={() => setShowTransferModal(true)}>
          <i className="fa-solid fa-paper-plane-top"></i> Transfer
        </button>
      );
    }
  }

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
                  autoComplete="off"
                  className="form-control"
                  id="from-amount"
                  placeholder="0.0000"
                  value={from === 0.0 ? '' : from}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFrom(parseInt(e.target.value))}
                />
              </div>
              <span className={`change-token ${swap && 'swap'}`} onClick={swapFromTo}>
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
                  autoComplete="off"
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

              {transferButton}
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
          if (chainTo.chainId == chain.chainId) {
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
          if (chainFrom.chainId == chain.chainId) {
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
