import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalTitle } from '@components/Modal';

interface TransferModalProps {
  isShow: boolean;
  close: () => void;
}

const TransferModal = ({ isShow, close }: TransferModalProps) => {
  return (
    <Modal show={isShow} onHide={close}>
      <ModalTitle close={close}>Please wait</ModalTitle>
      <ModalBody>
        <div className="progress-transfer">
          <div className="percent">
            <svg>
              <circle cx="105" cy="105" r="60"></circle>
              <circle cx="105" cy="105" r="60" style={{ '--percent': 67 } as React.CSSProperties}></circle>
            </svg>
            <div className="number">
              <h3>
                67<span>%</span>
              </h3>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <ul className="progress-transfer-list">
          <li>
            <i className="fa-light fa-circle-check"></i> <span>1. Confirming transaction on source chain</span>
          </li>
          <li>
            <i className="fa-light fa-circle-check"></i> <span>2. Creating distributed signature by validators</span>
          </li>
          <li className="progress-active">
            <i className="fa-light fa-spinner-third"></i> <span>3. Confirming transaction on destination chain</span>
          </li>
        </ul>
      </ModalFooter>
    </Modal>
  );
};

export default TransferModal;
