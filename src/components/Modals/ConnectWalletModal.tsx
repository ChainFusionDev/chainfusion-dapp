import React from 'react';
import { Modal, ModalBody, ModalTitle } from '@components/Modal';

interface ConnectWalletModalProps {
  isShow: boolean;
  close: () => void;
}

const ConnectWalletModal = ({ isShow, close }: ConnectWalletModalProps) => {
  return (
    <Modal show={isShow} onHide={close}>
      <ModalTitle close={close}>Connect a wallet</ModalTitle>
      <ModalBody>
        <ul className="wallet-list">
          <li>
            <img src="/img/wallet/metamask.svg" alt="MetaMask Logo" /> MetaMask
          </li>
          <li>
            <img src="/img/wallet/walletconnect.svg" alt="Wallet Connect Logo" /> Wallet Connect
          </li>
          <li>
            <img src="/img/wallet/binance.svg" alt="Binance Wallet Logo" /> Binance Wallet
          </li>
          <li>
            <img src="/img/wallet/coinbase.svg" alt="Coinbase Wallet Logo" /> Coinbase Wallet
          </li>
        </ul>
      </ModalBody>
    </Modal>
  );
};

export default ConnectWalletModal;
