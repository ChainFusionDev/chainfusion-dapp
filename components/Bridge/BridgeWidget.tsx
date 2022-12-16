import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BigNumber, BytesLike, ethers, Event, utils } from 'ethers';
import { ERC20Bridge, MockToken__factory } from '@chainfusion/erc-20-bridge-contracts';
import FeeEstimate from '@components/Bridge/FeeEstimate';
import SelectChainTokenModal from '@components/Modals/SelectChainTokenModal';
import OptionsModal from '@components/Modals/OptionsModal';
import TransferModal from '@components/Modals/TransferModal';
import { getChain, getToken, getSupportedChains, getSupportedTokens, getChainById, getNativeChain } from '@src/config';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { useChainContext } from '@src/context/ChainContext';
import { Chain, Token } from '@src/types';
import Alert from '@components/Alerts/Alert';
import { EventRegistry, RelayBridge } from '@chainfusion/chainfusion-contracts';
import { decodeBridgeTransfer, decodeSendEventData, getTransactionLink } from '@src/utils';
import { useAPI } from '@src/hooks/useAPI';
import { useBridge } from '@store/bridge/hooks';

interface FeeInfo {
  validatorsFee: BigNumber;
  liquidityFee: BigNumber;
}

const MsgApproveSuccess = () => (
  <Alert
    alertType="success"
    icon="fa-circle-check"
    title="Success"
    message="You have successfully approved token spending"
  />
);

const MsgTransferSuccess = () => (
  <Alert alertType="success" icon="fa-circle-check" title="Success" message="Successfully transferred token" />
);

const BridgeWidget = () => {
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const [validationPending, setValidationPending] = useState(false);
  const [approvalPending, setApprovalPending] = useState(false);
  const [transferPending, setTransferPending] = useState(false);
  const [needsApproval, setNeedsApproval] = useState(true);
  const [insufficientBalance, setInsufficientBalance] = useState(false);

  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
  const [fromString, setFromString] = useState<string>('');
  const [toString, setToString] = useState<string>('');
  const parsedFrom = parseFloat(fromString);
  const from = isNaN(parsedFrom) ? 0 : parsedFrom;

  const [estimatedFee, setEstimatedFee] = useState<FeeInfo>({
    validatorsFee: BigNumber.from(0),
    liquidityFee: BigNumber.from(0),
  });

  const [transferStage, setTransferStage] = useState<number>(1);
  const [stageLinks, setStageLinks] = useState(new Map<number, string>());

  const [swap, setSwap] = useState(false);

  const chains = getSupportedChains();
  const tokens = getSupportedTokens();

  const { receiver } = useBridge();

  const [chainFromLocal, setChainFrom] = useLocalStorage<string>('chain-from');
  const [tokenFromLocal, setTokenFrom] = useLocalStorage<string>('token-from');
  const chainFrom = chainFromLocal ? getChain(chainFromLocal) : chains[0];
  const tokenFrom = tokenFromLocal ? getToken(tokenFromLocal) : tokens[0];

  const [chainToLocal, setChainTo] = useLocalStorage<string>('chain-to');
  const [tokenToLocal, setTokenTo] = useLocalStorage<string>('token-to');
  const chainTo = chainToLocal ? getChain(chainToLocal) : chains[1];
  const tokenTo = tokenToLocal ? getToken(tokenToLocal) : tokens[0];

  const { isActive, chainId } = useWeb3React();
  const { networkContainer, nativeContainer, switchNetwork, showConnectWalletDialog } = useChainContext();
  const { loadHistory } = useAPI();
  const tokenFromAddress = tokenFrom.chains[chainFrom.identifier];
  const tokenToAddress = tokenTo.chains[chainTo.identifier];

  const fromNetwork = networkContainer.get(chainFrom.identifier);
  const toNetwork = networkContainer.get(chainTo.identifier);

  const swapFromTo = () => {
    setChainFrom(chainTo.identifier);
    setTokenFrom(tokenTo.identifier);

    setChainTo(chainFrom.identifier);
    setTokenTo(tokenFrom.identifier);

    setSwap(!swap);
  };

  useEffect(() => {
    let pending = true;

    const updateBalance = async () => {
      if (fromNetwork === undefined || tokenFromAddress === undefined) {
        if (pending) {
          setBalance(BigNumber.from(0));
        }
        return;
      }

      const mockTokenFactory = new MockToken__factory(fromNetwork.provider.getSigner());
      const mockToken = mockTokenFactory.attach(tokenFromAddress);
      const balance = await mockToken.balanceOf(fromNetwork.account);

      if (pending) {
        setBalance(balance);
      }
    };

    updateBalance();

    return () => {
      pending = false;
    };
  }, [fromNetwork, tokenFromAddress]);

  useEffect(() => {
    let pending = true;

    setValidationPending(true);

    const validate = async () => {
      if (
        from === 0.0 ||
        fromNetwork === undefined ||
        fromNetwork.contracts === undefined ||
        tokenFromAddress === undefined
      ) {
        if (pending) {
          setInsufficientBalance(false);
          setNeedsApproval(false);
          setToString('');
          setEstimatedFee({
            validatorsFee: BigNumber.from(0),
            liquidityFee: BigNumber.from(0),
          });

          setValidationPending(false);
        }
        return;
      }

      let allowance: BigNumber = BigNumber.from(0);
      if (fromNetwork.connected) {
        const mockTokenFactory = new MockToken__factory(fromNetwork.provider.getSigner());
        const mockToken = mockTokenFactory.attach(tokenFromAddress);
        allowance = await mockToken.allowance(fromNetwork.account, fromNetwork.contracts.erc20Bridge.address);
      }

      const amount = ethers.utils.parseUnits(from.toString(), tokenFrom.decimals);

      const validatorsFee = await fromNetwork.contracts.feeManager.validatorRefundFee();
      const estimatedFee = await fromNetwork.contracts.feeManager.calculateFee(tokenFromAddress, amount);

      const willReceive = amount.sub(estimatedFee);

      if (pending) {
        setInsufficientBalance(balance.lt(amount));
        setNeedsApproval(allowance.lt(amount));
        setToString(utils.formatUnits(willReceive, tokenFrom.decimals));
        setEstimatedFee({
          validatorsFee: validatorsFee,
          liquidityFee: estimatedFee.sub(validatorsFee),
        });

        setValidationPending(false);
      }
    };

    validate();

    return () => {
      pending = false;
    };
  }, [fromNetwork, balance, from, tokenFrom, approvalPending, tokenFromAddress]);

  const approve = async () => {
    if (
      fromNetwork === undefined ||
      !fromNetwork.connected ||
      fromNetwork.contracts === undefined ||
      tokenFromAddress === undefined
    ) {
      return;
    }

    setApprovalPending(true);

    try {
      const { erc20Bridge } = fromNetwork.contracts;
      const mockTokenFactory = new MockToken__factory(fromNetwork.provider.getSigner());
      const mockToken = mockTokenFactory.attach(tokenFromAddress);
      const amount = ethers.utils.parseUnits(from.toString(), tokenFrom.decimals);

      await (await mockToken.approve(erc20Bridge.address, amount)).wait();
    } catch (e) {
      console.error(e);
    }

    toast(<MsgApproveSuccess />);
    setApprovalPending(false);
  };

  const transfer = async () => {
    if (
      fromNetwork === undefined ||
      !fromNetwork.connected ||
      fromNetwork.contracts === undefined ||
      toNetwork?.contracts === undefined ||
      tokenFromAddress === undefined ||
      tokenToAddress === undefined ||
      nativeContainer === undefined
    ) {
      return;
    }

    setStageLinks(new Map());
    setTransferStage(1);
    setTransferPending(true);
    setShowTransferModal(true);

    try {
      const { erc20Bridge } = fromNetwork.contracts;
      const amount = ethers.utils.parseUnits(from.toString(), tokenFrom.decimals);

      let depositReceiver = fromNetwork.account;
      if (receiver !== undefined) {
        depositReceiver = receiver;
      }

      const onEventRegisteredPromise = onEventRegistered(
        nativeContainer.eventRegistry,
        fromNetwork.contracts.relayBridge,
        {
          appContract: erc20Bridge.address,
          sender: fromNetwork.account,
          receiver: depositReceiver,
          sourceChain: BigNumber.from(chainFrom.chainId),
          destinationChain: BigNumber.from(chainTo.chainId),
        }
      );

      const onTransferCompletePromise = onTransferComplete(toNetwork.contracts.erc20Bridge, {
        sender: fromNetwork.account,
        receiver: depositReceiver,
        token: tokenToAddress,
        amount: amount,
      });

      const depositTx = await (
        await erc20Bridge.deposit(tokenFromAddress, chainTo.chainId, depositReceiver, amount)
      ).wait(1);
      setStageLinks(new Map(stageLinks.set(1, getTransactionLink(fromNetwork.chain, depositTx.transactionHash))));
      setTransferStage(2);

      const registeredEvent = await onEventRegisteredPromise;
      setStageLinks(new Map(stageLinks.set(2, getTransactionLink(getNativeChain(), registeredEvent.transactionHash))));
      setTransferStage(3);

      const transferCompleteEvent = await onTransferCompletePromise;
      setStageLinks(
        new Map(stageLinks.set(3, getTransactionLink(toNetwork.chain, transferCompleteEvent.transactionHash)))
      );
      setTransferStage(4);

      loadHistory();
    } catch (e) {
      console.error(e);
    }

    toast(<MsgTransferSuccess />);
    setFromString('');
    setTransferPending(false);
  };

  const transferButton = () => {
    if (from === 0.0) {
      return (
        <button disabled={true} className="transfer-button">
          Enter Amount
        </button>
      );
    }

    if (validationPending) {
      return (
        <button disabled={true} className="transfer-button">
          <i className="fa-solid fa-spinner"></i> Calculating...
        </button>
      );
    }

    if (!isActive) {
      return (
        <button className="transfer-button" onClick={() => showConnectWalletDialog(chainFrom)}>
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

    if (fromNetwork?.contracts === undefined || tokenFromAddress === undefined) {
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

    if (approvalPending) {
      return (
        <button disabled={true} className="transfer-button">
          <i className="fa-solid fa-spinner"></i> Approving...
        </button>
      );
    }

    if (transferPending) {
      return (
        <button disabled={true} className="transfer-button">
          <i className="fa-solid fa-spinner"></i> Transferring...
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
          className={`form-control ${balance.gt(0) && 'bridge-input-with-balance'}`}
          id="from-amount"
          placeholder="0.0000"
          value={fromString}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFromString(e.target.value)}
        />
        {balance.gt(0) && (
          <div className="bridge-balance amount-afterform">
            Available:{' '}
            <span
              onClick={() => {
                setFromString(ethers.utils.formatUnits(balance, tokenFrom.decimals));
              }}
            >
              {ethers.utils.formatUnits(balance, tokenFrom.decimals)}
            </span>
          </div>
        )}
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
      {estimatedFee.validatorsFee.add(estimatedFee.liquidityFee).gt(0) && (
        <FeeEstimate
          token={tokenFrom}
          validatorsFee={estimatedFee.validatorsFee}
          liquidityFee={estimatedFee.liquidityFee}
          isEstimating={validationPending}
        />
      )}
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
      <TransferModal
        show={showTransferModal}
        stage={transferStage}
        stageLinks={stageLinks}
        close={() => setShowTransferModal(false)}
      />
    </div>
  );
};

export default BridgeWidget;

interface EventRegisteredFilter {
  appContract: string;
  sender: string;
  receiver: string;
  sourceChain: BigNumber;
  destinationChain: BigNumber;
}

async function onEventRegistered(
  eventRegistry: EventRegistry,
  relayBridge: RelayBridge,
  filter: EventRegisteredFilter
): Promise<Event> {
  return new Promise<Event>((resolve) => {
    eventRegistry.once(
      'EventRegistered',
      async (
        hash: BytesLike,
        appContract: string,
        sourceChain: BigNumber,
        destinationChain: BigNumber,
        data: BytesLike,
        validatorFee: BigNumber,
        eventType: BigNumber,
        event: Event
      ) => {
        if (
          appContract !== filter.appContract ||
          !sourceChain.eq(filter.sourceChain) ||
          !destinationChain.eq(filter.destinationChain)
        ) {
          return;
        }

        const fromChain = getChainById(sourceChain.toNumber());
        const toChain = getChainById(destinationChain.toNumber());

        if (fromChain === undefined || toChain === undefined) {
          return;
        }

        const sentData = decodeSendEventData(data);
        if (sentData === undefined) {
          return;
        }

        const item = decodeBridgeTransfer(hash.toString(), fromChain, toChain, sentData);
        if (item === undefined || item.sender !== filter.sender || item.receiver !== filter.receiver) {
          return;
        }

        resolve(event);

        return false;
      }
    );
  });
}

interface TransferCompleteFilter {
  sender: string;
  receiver: string;
  token: string;
  amount: BigNumber;
}

async function onTransferComplete(erc20Bridge: ERC20Bridge, filter: TransferCompleteFilter): Promise<Event> {
  return new Promise<Event>((resolve) => {
    erc20Bridge.on(
      'Transferred',
      (
        sender: string,
        token: string,
        destinationChain: BigNumber,
        receiver: string,
        amount: BigNumber,
        event: Event
      ) => {
        if (sender !== filter.sender || receiver !== filter.receiver || token !== filter.token) {
          return;
        }

        resolve(event);

        return false;
      }
    );
  });
}
