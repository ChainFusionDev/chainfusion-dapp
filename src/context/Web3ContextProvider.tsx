import { createContext, ReactElement, useCallback, useContext, useEffect, useState } from 'react';
import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { MetaMask } from '@web3-react/metamask';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { WalletConnect } from '@web3-react/walletconnect';
import { Ethereum } from '@src/types';
import { ethers } from 'ethers';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { Chain } from '@src/config';

export const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions }));

export const [coinbaseWallet, coinbaseWalletHooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({ actions, options: { appName: 'ChainFusion Bridge', url: 'https://rpc.chainfusion.org' } })
);

export const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  (actions) => new WalletConnect({ actions, options: { rpc: 'https://rpc.chainfusion.org' } })
);

export const getConnectors = (): [Connector, Web3ReactHooks][] => {
  return [
    [metaMask, metaMaskHooks],
    [coinbaseWallet, coinbaseWalletHooks],
    [walletConnect, walletConnectHooks],
  ];
};

export enum WalletType {
  METAMASK = 'metamask',
  COINBASE = 'coinbase',
  WALLET_CONNECT = 'wallet_connect',
}

export interface Web3Connection {
  provider: ethers.providers.Web3Provider;
  network: ethers.providers.Network;
  address: string;
}

export interface Web3ContextData {
  connection: Web3Connection | undefined;
  loadWallet: () => Promise<void>;
  connectWallet: (wallet: WalletType) => Promise<void>;
  switchNetwork: (chain: Chain) => Promise<void>;
  disconnectWallet: () => void;
}

export const Web3Context = createContext({} as Web3ContextData);

export interface Web3ContextProviderProps {
  children: ReactElement;
}

export const Web3ContextProvider = ({ children }: Web3ContextProviderProps) => {
  const [connector, setConnector] = useState<Connector | undefined>(undefined);
  const [connection, setConnection] = useState<Web3Connection | undefined>(undefined);
  const [walletType, setWalletType] = useLocalStorage<WalletType>('wallet-type', WalletType.METAMASK);

  let ethereum: Ethereum | undefined = undefined;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      ethereum = window.ethereum as Ethereum | undefined;
    }
  });

  useEffect(() => {
    loadWallet();
    ethereum?.on('accountsChanged', () => window.location.reload());
    ethereum?.on('chainChanged', () => window.location.reload());
  }, []);

  const loadWallet = async () => {
    const provider = getProvider();
    if (provider !== undefined) {
      const network = await provider.getNetwork();
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        const address = accounts[0];
        setConnection({ provider, network, address });
        switch (walletType) {
          case WalletType.METAMASK:
            setConnector(metaMask);
            break;
          case WalletType.COINBASE:
            setConnector(coinbaseWallet);
            break;
          case WalletType.WALLET_CONNECT:
            setConnector(walletConnect);
            break;
        }
      }
    }
  };

  const connectWallet = async (wallet: WalletType): Promise<void> => {
    switch (wallet) {
      case WalletType.METAMASK:
        await metaMask.activate();
        setConnector(metaMask);
        break;
      case WalletType.COINBASE:
        await coinbaseWallet.activate();
        setConnector(coinbaseWallet);
        break;
      case WalletType.WALLET_CONNECT:
        await walletConnect.activate();
        setConnector(walletConnect);
        break;
    }

    setWalletType(wallet);
    loadWallet();
  };

  const switchNetwork = async (chain: Chain) => {
    if (connector === undefined) {
      return;
    }

    const chainParams = {
      chainId: chain.chainId.toString(16),
      chainName: chain.name,
      nativeCurrency: chain.nativeCurrency,
      rpcUrls: [chain.rpc],
      blockExplorerUrls: [chain.explorer],
    };

    try {
      await connector.activate(chainParams);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any)?.code === -32603) {
        console.log('Here');
        await connector.provider?.request({
          method: 'wallet_addEthereumChain',
          params: [chainParams],
        });
      }

      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    if (connector !== undefined && connector.deactivate !== undefined) {
      await connector.deactivate();
    }

    setConnector(undefined);
    setConnection(undefined);
  };

  const getProvider = () => {
    if (ethereum === undefined) {
      return undefined;
    }

    if (!ethereum.providers?.length) {
      return new ethers.providers.Web3Provider(ethereum);
    }

    let provider;
    switch (walletType) {
      case WalletType.COINBASE:
        provider = ethereum.providers.find(
          ({ isCoinbaseWallet, isCoinbaseBrowser }) => isCoinbaseWallet || isCoinbaseBrowser
        );
        break;
      case WalletType.METAMASK:
        provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
        break;
      default:
        provider = ethereum.providers[0];
    }

    if (provider) {
      ethereum.setSelectedProvider(provider);
    }

    return new ethers.providers.Web3Provider(provider || ethereum.providers[0]);
  };

  return (
    <Web3Context.Provider
      value={{
        connection,
        loadWallet,
        connectWallet,
        switchNetwork,
        disconnectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => useContext(Web3Context);
