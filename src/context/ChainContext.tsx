import {
  ERC20Bridge,
  ERC20Bridge__factory,
  TokenManager,
  TokenManager__factory,
} from '@chainfusion/erc-20-bridge-contracts';
import ConnectWalletModal from '@components/Modals/ConnectWalletModal';
import { getChainById } from '@src/config';
import { coinbaseWallet, metaMask, walletConnect } from '@src/connectors/connectors';
import { Chain } from '@src/types';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';

export interface ChainContainer {
  provider: ethers.providers.Web3Provider;
  account: string;

  erc20Bridge: ERC20Bridge;
  tokenManager: TokenManager;
}

export interface ChainContextData {
  chainContainer?: ChainContainer;
  switchNetwork: (chain: Chain) => Promise<void>;
  showConnectWalletDialog: () => void;
}

export const ChainContext = createContext({} as ChainContextData);
export const useChainContext = () => useContext(ChainContext);

export interface ChainContextProviderProps {
  children: ReactElement;
}

export const ChainContextProvider = ({ children }: ChainContextProviderProps) => {
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
  const [chainContainer, setChainContainer] = useState<ChainContainer | undefined>(undefined);
  const { chainId, account, provider, connector } = useWeb3React();

  useEffect(() => {
    metaMask.connectEagerly().catch(() => null);
    coinbaseWallet.connectEagerly().catch(() => null);
    walletConnect.connectEagerly().catch(() => null);
  }, []);

  useEffect(() => {
    let pending = true;

    const loadContracts = async (
      erc20BridgeAddress: string,
      provider: ethers.providers.Web3Provider,
      account: string
    ) => {
      const erc20BridgeFactory = new ERC20Bridge__factory(provider.getSigner());
      const erc20Bridge = erc20BridgeFactory.attach(erc20BridgeAddress);

      const tokenManagerAddress = await erc20Bridge.tokenManager();
      const tokenManagerFactory = new TokenManager__factory(provider.getSigner());
      const tokenManager = tokenManagerFactory.attach(tokenManagerAddress);

      if (pending) {
        setChainContainer({
          provider,
          account,
          erc20Bridge,
          tokenManager,
        });
      }
    };

    if (chainId === undefined || provider === undefined || account === undefined) {
      setChainContainer(undefined);
      return;
    }

    const chain = getChainById(chainId);
    if (chain.erc20BridgeAddress === undefined) {
      setChainContainer(undefined);
      return;
    }

    loadContracts(chain.erc20BridgeAddress, provider, account);

    return () => {
      pending = false;
    };
  }, [chainId, provider, account]);

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

  const showConnectWalletDialog = () => {
    setShowConnectWalletModal(true);
  };

  return (
    <ChainContext.Provider value={{ chainContainer: chainContainer, switchNetwork, showConnectWalletDialog }}>
      {children}
      <ConnectWalletModal show={showConnectWalletModal} close={() => setShowConnectWalletModal(false)} />
    </ChainContext.Provider>
  );
};
