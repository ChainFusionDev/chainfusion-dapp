import React from 'react';
import { Modal, ModalBody, ModalTitle } from '@components/Modal';
import { WalletType } from '@src/context/Web3ContextProvider';

interface ConnectWalletModalProps {
  show: boolean;
  select: (walletType: WalletType) => void;
  close: () => void;
}

const ConnectWalletModal = ({ show, select, close }: ConnectWalletModalProps) => {
  return (
    <Modal show={show} size="sm" onHide={close}>
      <ModalTitle close={close}>Connect a wallet</ModalTitle>
      <ModalBody>
        <ul className="wallet-list">
          <li onClick={() => select(WalletType.METAMASK)}>
            <img src="/img/wallet/metamask.svg" alt="MetaMask Logo" /> MetaMask
          </li>
          <li onClick={() => select(WalletType.WALLET_CONNECT)}>
            <img src="/img/wallet/walletconnect.svg" alt="Wallet Connect Logo" /> Wallet Connect
          </li>
          <li onClick={() => select(WalletType.COINBASE)}>
            <img src="/img/wallet/coinbase.svg" alt="Coinbase Wallet Logo" /> Coinbase Wallet
          </li>
          {/* <li>
            <img src="/img/wallet/binance.svg" alt="Binance Wallet Logo" /> Binance Wallet
          </li> */}
        </ul>
      </ModalBody>
    </Modal>
  );
};

export default ConnectWalletModal;
