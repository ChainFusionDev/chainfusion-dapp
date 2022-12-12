import {
  EventRegistry,
  EventRegistry__factory,
  RelayBridge,
  RelayBridge__factory,
  Staking,
  Staking__factory,
} from '@chainfusion/chainfusion-contracts';
import {
  ERC20Bridge,
  ERC20Bridge__factory,
  FeeManager,
  FeeManager__factory,
  TokenManager,
  TokenManager__factory,
} from '@chainfusion/erc-20-bridge-contracts';
import ConnectWalletModal from '@components/Modals/ConnectWalletModal';
import { getChainById, getChainParams, getNativeChain, getNativeContracts, getSupportedChains } from '@src/config';
import { coinbaseWallet, metaMask, walletConnect } from '@src/connectors/connectors';
import { Chain } from '@src/types';
import { useBridge } from '@store/bridge/hooks';
import { EventRegistered } from '@store/bridge/reducer';
import { useWeb3React } from '@web3-react/core';
import { ethers, providers } from 'ethers';
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';

const defaultAccount = '0x0000000000000000000000000000000000000001';

export interface NativeContainer {
  provider: providers.JsonRpcProvider;
  account: string;
  connected: boolean;

  staking: Staking;
  eventRegistry: EventRegistry;
}

export interface NetworkContainer {
  [key: string]: ChainNetwork | undefined;
}

export interface AddressContainer {
  [key: string]: ChainAddresses | undefined;
}

export interface ChainAddressesPromises {
  [key: string]: Promise<ChainAddresses | undefined> | undefined;
}

export interface ChainNetwork {
  chain: Chain;
  provider: providers.JsonRpcProvider;
  account: string;
  connected: boolean;

  contracts?: ChainContracts;
}

export interface ChainAddresses {
  erc20Bridge: string;
  relayBridge: string;
  tokenManager: string;
  feeManager: string;
}

export interface ChainContracts {
  erc20Bridge: ERC20Bridge;
  relayBridge: RelayBridge;
  tokenManager: TokenManager;
  feeManager: FeeManager;
}

export interface ChainContextData {
  nativeContainer?: NativeContainer;
  networkContainer: NetworkContainer;
  addressContainer?: AddressContainer;
  actions: ChainActions;
}

export interface ChainActions {
  switchNetwork: (chain: Chain) => Promise<void>;
  showConnectWalletDialog: (chain?: Chain) => void;
  loadHistory: () => Promise<void>;
}

export const ChainContext = createContext({} as ChainContextData);
export const useChainContext = () => useContext(ChainContext);

export interface ChainContextProviderProps {
  children: ReactElement;
}

export const ChainContextProvider = ({ children }: ChainContextProviderProps) => {
  const { setHistory } = useBridge();

  const initialNetworkContainer: NetworkContainer = {};
  const chains = getSupportedChains();
  for (const chain of chains) {
    const provider = new ethers.providers.JsonRpcProvider(chain.rpc, chain.chainId);

    const chainNetwork: ChainNetwork = {
      chain: chain,
      provider: provider,
      account: defaultAccount,
      connected: false,
    };

    initialNetworkContainer[chain.identifier] = chainNetwork;
  }

  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
  const [desiredChain, setDesiredChain] = useState<Chain>();
  const [addressContainer, setAddressContainer] = useState<AddressContainer | undefined>(undefined);
  const [networkContainer, setNetworkContainer] = useState<NetworkContainer>(initialNetworkContainer);
  const [nativeContainer, setNativeContainer] = useState<NativeContainer | undefined>(undefined);
  const { chainId, account, provider, connector } = useWeb3React();

  useEffect(() => {
    metaMask.connectEagerly().catch(() => null);
    coinbaseWallet.connectEagerly().catch(() => null);
    walletConnect.connectEagerly().catch(() => null);
  }, []);

  useEffect(() => {
    try {
      const nativeChain = getNativeChain();
      const nativeContracts = getNativeContracts();

      let connected = false;
      let nativeProvider = new providers.JsonRpcProvider(nativeChain.rpc, nativeChain.chainId);
      if (provider !== undefined && chainId === nativeChain.chainId) {
        nativeProvider = provider;
        connected = true;
      }

      const nativeAccount = account ?? defaultAccount;

      const stakingFactory = new Staking__factory(nativeProvider.getSigner(nativeAccount));
      const staking = stakingFactory.attach(nativeContracts.staking);

      const eventRegistryFactory = new EventRegistry__factory(nativeProvider.getSigner(nativeAccount));
      const eventRegistry = eventRegistryFactory.attach(nativeContracts.eventRegistry);

      setNativeContainer({
        account: nativeAccount,
        provider: nativeProvider,
        connected,
        staking,
        eventRegistry,
      });
    } catch (e) {
      setNativeContainer(undefined);
    }
  }, [account, chainId, provider]);

  useEffect(() => {
    let pending = true;

    const loadChainAddresses = async (chain: Chain) => {
      const erc20BridgeAddress = chain.erc20BridgeAddress;
      if (erc20BridgeAddress === undefined) {
        return undefined;
      }

      const provider = new providers.JsonRpcProvider(chain.rpc, chain.chainId);

      const erc20BridgeFactory = new ERC20Bridge__factory(provider.getSigner());
      const erc20Bridge = erc20BridgeFactory.attach(erc20BridgeAddress);

      const relayBridgeAddressPromise = erc20Bridge.relayBridge();
      const tokenManagerAddressPromise = erc20Bridge.tokenManager();
      const feeManagerAddressPromise = erc20Bridge.feeManager();

      const chainAddresses: ChainAddresses = {
        erc20Bridge: erc20BridgeAddress,
        relayBridge: await relayBridgeAddressPromise,
        tokenManager: await tokenManagerAddressPromise,
        feeManager: await feeManagerAddressPromise,
      };

      return chainAddresses;
    };

    const loadAddressContainer = async () => {
      const chainAddressesPromises: ChainAddressesPromises = {};
      for (const chain of chains) {
        chainAddressesPromises[chain.identifier] = loadChainAddresses(chain);
      }

      const addressContainer: AddressContainer = {};
      for (const [key, value] of Object.entries(chainAddressesPromises)) {
        if (value === undefined) {
          continue;
        }

        const chainAddresses = await value;

        if (chainAddresses === undefined) {
          continue;
        }

        addressContainer[key] = chainAddresses;
      }

      if (pending) {
        setAddressContainer(addressContainer);
      }
    };

    loadAddressContainer();

    return () => {
      pending = false;
    };
  }, [chains]);

  useEffect(() => {
    const networkContainer: NetworkContainer = {};

    for (const chain of chains) {
      let chainProvider: providers.JsonRpcProvider = new providers.JsonRpcProvider(chain.rpc, chain.chainId);
      let chainAccount = defaultAccount;
      let chainConnected = false;

      if (account !== undefined) {
        chainAccount = account;
      }

      if (chain.chainId === chainId && provider !== undefined) {
        chainProvider = provider;
        chainConnected = true;
      }

      if (addressContainer === undefined) {
        continue;
      }

      const chainAddresses = addressContainer[chain.identifier];
      let chainContracts: ChainContracts | undefined = undefined;

      if (chainAddresses !== undefined) {
        const signer = chainProvider.getSigner();

        const erc20BridgeFactory = new ERC20Bridge__factory(signer);
        const erc20Bridge = erc20BridgeFactory.attach(chainAddresses.erc20Bridge);

        const relayBridgeFactory = new RelayBridge__factory(signer);
        const relayBridge = relayBridgeFactory.attach(chainAddresses.relayBridge);

        const tokenManagerFactory = new TokenManager__factory(signer);
        const tokenManager = tokenManagerFactory.attach(chainAddresses.tokenManager);

        const feeManagerFactory = new FeeManager__factory(signer);
        const feeManager = feeManagerFactory.attach(chainAddresses.feeManager);

        chainContracts = {
          erc20Bridge,
          relayBridge,
          tokenManager,
          feeManager,
        };
      }

      const chainNetwork: ChainNetwork = {
        chain: chain,
        provider: chainProvider,
        account: chainAccount,
        connected: chainConnected,

        contracts: chainContracts,
      };

      networkContainer[chain.identifier] = chainNetwork;
    }

    setNetworkContainer(networkContainer);
  }, [account, chains, chainId, provider, addressContainer]);

  const switchNetwork = async (chain: Chain) => {
    await connector.activate(getChainParams(chain));
  };

  const showConnectWalletDialog = (chain?: Chain) => {
    setDesiredChain(chain);
    setShowConnectWalletModal(true);
  };

  const loadHistory = async () => {
    if (nativeContainer === undefined || addressContainer === undefined) {
      return;
    }

    const currentBlock = await nativeContainer.provider.getBlockNumber();
    const filter = nativeContainer.eventRegistry.filters.EventRegistered();
    const events = await nativeContainer.eventRegistry.queryFilter(filter, currentBlock - 100000, currentBlock);

    let eventHistory: EventRegistered[] = [];
    for (const event of events) {
      const fromChain = getChainById(event.args._sourceChain.toNumber());
      const toChain = getChainById(event.args._destinationChain.toNumber());

      if (fromChain === undefined || toChain === undefined) {
        continue;
      }

      const fromNetwork = networkContainer[fromChain.identifier];

      const erc20BridgeAddress = fromNetwork?.contracts?.erc20Bridge.address;
      if (event.args._appContract !== erc20BridgeAddress) {
        continue;
      }

      eventHistory.push(event.args);
    }

    if (eventHistory.length === 0) {
      return;
    }

    eventHistory = eventHistory.reverse();
    setHistory([...eventHistory]);
  };

  const actions: ChainActions = {
    switchNetwork,
    showConnectWalletDialog,
    loadHistory,
  };

  return (
    <ChainContext.Provider value={{ nativeContainer, networkContainer, addressContainer, actions }}>
      {children}
      <ConnectWalletModal
        show={showConnectWalletModal}
        desiredChain={desiredChain}
        close={() => setShowConnectWalletModal(false)}
      />
    </ChainContext.Provider>
  );
};
