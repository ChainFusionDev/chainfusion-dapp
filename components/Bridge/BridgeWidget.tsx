import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { MockToken__factory } from '@chainfusion/erc-20-bridge-contracts';
import FeeEstimate from '@components/Bridge/FeeEstimate';
import SelectChainTokenModal from '@components/Modals/SelectChainTokenModal';
import OptionsModal from '@components/Modals/OptionsModal';
import TransferModal from '@components/Modals/TransferModal';
import { getChain, getToken, supportedChains, supportedTokens } from '@src/config';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { useChainContext } from '@src/context/ChainContext';
import { Chain, Token } from '@src/types';

const BridgeWidget = () => {
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const [validationPending, setValidationPending] = useState(false);
  const [approvalPending, setApprovalPending] = useState(false);
  const [needsApproval, setNeedsApproval] = useState(true);
  const [insufficientBalance, setInsufficientBalance] = useState(false);

  const [fromString, setFromString] = useState<string>('');
  const [toString, setToString] = useState<string>('');
  const parsedFrom = parseFloat(fromString);
  const from = isNaN(parsedFrom) ? 0 : parsedFrom;

  const [swap, setSwap] = useState(false);

  const chains = supportedChains();
  const tokens = supportedTokens();

  const [chainFromLocal, setChainFrom] = useLocalStorage<string>('chain-from');
  const [tokenFromLocal, setTokenFrom] = useLocalStorage<string>('token-from');
  const chainFrom = chainFromLocal ? getChain(chainFromLocal) : chains[0];
  const tokenFrom = tokenFromLocal ? getToken(tokenFromLocal) : tokens[0];

  const [chainToLocal, setChainTo] = useLocalStorage<string>('chain-to');
  const [tokenToLocal, setTokenTo] = useLocalStorage<string>('token-to');
  const chainTo = chainToLocal ? getChain(chainToLocal) : chains[1];
  const tokenTo = tokenToLocal ? getToken(tokenToLocal) : tokens[0];

  const { isActive, chainId } = useWeb3React();
  const { chainContainer, switchNetwork, showConnectWalletDialog } = useChainContext();
  const tokenAddress = tokenFrom.chains[chainFrom.identifier];

  const swapFromTo = () => {
    setFromString(toString);
    setChainFrom(chainTo.identifier);
    setTokenFrom(tokenTo.identifier);

    setToString(fromString);
    setChainTo(chainFrom.identifier);
    setTokenTo(tokenFrom.identifier);

    setSwap(!swap);
  };

  useEffect(() => {
    let pending = true;

    setValidationPending(false);

    const validate = async () => {
      if (chainContainer === undefined || tokenAddress === undefined) {
        return;
      }

      if (from === 0.0) {
        if (pending) {
          setNeedsApproval(false);
          setValidationPending(true);
        }
        return;
      }

      const mockTokenFactory = new MockToken__factory(chainContainer.provider.getSigner());
      const mockToken = mockTokenFactory.attach(tokenAddress);
      const allowance = await mockToken.allowance(chainContainer.account, chainContainer.erc20Bridge.address);
      const balance = await mockToken.balanceOf(chainContainer.account);
      const amount = ethers.utils.parseEther(from.toString());

      if (pending) {
        setInsufficientBalance(balance.lt(amount));
        setNeedsApproval(allowance.lt(amount));
        setValidationPending(true);
      }
    };

    validate();

    return () => {
      pending = false;
    };
  }, [from, approvalPending, tokenAddress, chainContainer]);

  const approve = async () => {
    if (chainContainer === undefined || tokenAddress === undefined) {
      return;
    }

    setApprovalPending(true);

    try {
      const { erc20Bridge } = chainContainer;
      const mockTokenFactory = new MockToken__factory(chainContainer.provider.getSigner());
      const mockToken = mockTokenFactory.attach(tokenAddress);
      const amount = ethers.utils.parseEther(from.toString());

      await (await mockToken.approve(erc20Bridge.address, amount)).wait();
    } catch (e) {
      console.error(e);
    }

    setApprovalPending(false);
  };

  const transfer = async () => {
    if (chainContainer === undefined || tokenAddress === undefined) {
      return;
    }

    setShowTransferModal(true);

    try {
      const { erc20Bridge } = chainContainer;
      const amount = ethers.utils.parseEther(from.toString());

      await (await erc20Bridge.deposit(tokenAddress, chainTo.chainId, chainContainer.account, amount)).wait();
    } catch (e) {
      console.error(e);
    }

    setFromString('');
    setShowTransferModal(false);
  };

  const transferButton = () => {
    if (from === 0.0) {
      return (
        <button disabled={true} className="transfer-button">
          Enter Amount
        </button>
      );
    }

    if (!isActive) {
      return (
        <button className="transfer-button" onClick={showConnectWalletDialog}>
          <i className="fa-regular fa-wallet"></i> Connect Wallet
        </button>
      );
    }

    if (chainId !== chainFrom.chainId) {
      return (
        <button className="transfer-button" onClick={() => switchNetwork(chainFrom)}>
          <i className="fa-regular fa-shuffle"></i> Switch Network to{' '}
          <img className="chain-icon-sm" src={`/img/${chainFrom.identifier}.svg`} alt={chainFrom.name} />{' '}
          {chainFrom.name}
        </button>
      );
    }

    if (chainContainer === undefined) {
      return (
        <button disabled={true} className="transfer-button">
          Not Supported
        </button>
      );
    }

    if (insufficientBalance) {
      return (
        <button disabled={true} className="transfer-button">
          Insufficient Balance
        </button>
      );
    }

    if (!validationPending) {
      return (
        <button disabled={true} className="transfer-button">
          <i className="fa-solid fa-spinner"></i> Calculating...
        </button>
      );
    }

    if (needsApproval) {
      return (
        <button className="transfer-button" onClick={() => approve()}>
          <i className="fa-solid fa-check"></i> Approve
        </button>
      );
    }

    if (approvalPending) {
      return (
        <button disabled={true} className="transfer-button">
          <i className="fa-solid fa-spinner"></i> Approving...
        </button>
      );
    }

    return (
      <button className="transfer-button" onClick={() => transfer()}>
        <i className="fa-solid fa-paper-plane-top"></i> Transfer
      </button>
    );
  };

  return (
    <div className="form-bridge">
      <i className="fa-light fa-gear setting-receiver" onClick={() => setShowOptionsModal(true)}></i>
      <div className="mx-auto logo">
        <img src="/img/logo.svg" alt="ChainFusion Logo" className="img-fluid d-block d-sm-block" />
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
          type="text"
          autoComplete="off"
          className="form-control"
          id="from-amount"
          placeholder="0.0000"
          value={fromString}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFromString(e.target.value)}
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
          disabled={true}
          type="text"
          autoComplete="off"
          className="form-control"
          id="to-amount"
          value={toString}
          placeholder="0.0000"
        />
      </div>

      <FeeEstimate token={tokenFrom} validatorsFee={0.3} liquidityFee={0.2} />

      {transferButton()}
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
