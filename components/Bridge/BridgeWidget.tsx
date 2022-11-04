import FeeEstimate from '@components/FeeEstimate';
import SelectChainTokenModal from '@components/Modals/SelectChainTokenModal';
import OptionsModal from '@components/Modals/OptionsModal';
import TransferModal from '@components/Modals/TransferModal';
import { Chain, getChain, getToken, supportedChains, supportedTokens, Token } from '@src/config';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { useWeb3React } from '@web3-react/core';
import { useChainContext } from '@src/context/ChainContext';
import { useState } from 'react';

const BridgeWidget = () => {
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const [from, setFrom] = useState<number>(0.0);
  const [to, setTo] = useState<number>(0.0);
  const [swap, setSwap] = useState(false);

  const chains = supportedChains();
  const tokens = supportedTokens();

  const [chainFromLocal, setChainFrom] = useLocalStorage<string>('chain-from');
  const [tokenFromLocal, setTokenFrom] = useLocalStorage<string>('token-from');

  const [chainToLocal, setChainTo] = useLocalStorage<string>('chain-to');
  const [tokenToLocal, setTokenTo] = useLocalStorage<string>('token-to');

  const chainFrom = chainFromLocal ? getChain(chainFromLocal) : chains[0];
  const tokenFrom = tokenFromLocal ? getToken(tokenFromLocal) : tokens[0];

  const chainTo = chainToLocal ? getChain(chainToLocal) : chains[1];
  const tokenTo = tokenToLocal ? getToken(tokenToLocal) : tokens[0];

  const { connector, isActive, chainId } = useWeb3React();
  const { showConnectWalletDialog } = useChainContext();

  const swapFromTo = () => {
    setFrom(to);
    setChainFrom(chainTo.identifier);
    setTokenFrom(tokenTo.identifier);

    setTo(from);
    setChainTo(chainFrom.identifier);
    setTokenTo(tokenFrom.identifier);

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
            setChainTo(chainFrom.identifier);
          }

          setChainFrom(chain.identifier);
          setTokenFrom(token.identifier);

          // Currently we support transferring only same tokens on both chains
          setTokenTo(token.identifier);
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
            setChainFrom(chainTo.identifier);
          }

          setChainTo(chain.identifier);
          setTokenTo(token.identifier);

          // Currently we support transferring only same tokens on both chains
          setTokenFrom(token.identifier);
        }}
      />

      <OptionsModal show={showOptionsModal} close={() => setShowOptionsModal(false)} />
      <TransferModal show={showTransferModal} close={() => setShowTransferModal(false)} />
    </div>
  );
};

export default BridgeWidget;
