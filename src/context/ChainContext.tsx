import ConnectWalletModal from '@components/Modals/ConnectWalletModal';
import { coinbaseWallet, metaMask, walletConnect } from '@src/connectors/connectors';
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';

export interface ChainContextData {
  showConnectWalletDialog: () => void;
}

export const ChainContext = createContext({} as ChainContextData);
export const useChainContext = () => useContext(ChainContext);

export interface ChainContextProviderProps {
  children: ReactElement;
}

export const ChainContextProvider = ({ children }: ChainContextProviderProps) => {
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);

  useEffect(() => {
    metaMask.connectEagerly().catch(() => null);
    coinbaseWallet.connectEagerly().catch(() => null);
    walletConnect.connectEagerly().catch(() => null);
  }, []);

  const showConnectWalletDialog = () => {
    setShowConnectWalletModal(true);
  };

  return (
    <ChainContext.Provider value={{ showConnectWalletDialog }}>
      {children}
      <ConnectWalletModal show={showConnectWalletModal} close={() => setShowConnectWalletModal(false)} />
    </ChainContext.Provider>
  );
};
