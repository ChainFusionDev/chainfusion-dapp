import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalTitle } from '@components/Modal';

interface OptionsModalProps {
  show: boolean;
  close: () => void;
}

const OptionsModal = ({ show, close }: OptionsModalProps) => {
  return (
    <Modal show={show} onHide={close}>
      <ModalTitle close={close}>Options</ModalTitle>
      <ModalBody>
        <div className="form-group">
          <label>Receiver:</label>
          <input
            type="text"
            className="input-standart"
            id="receiver"
            value="0xd13F66863ED91704e386C57501F00b5307CAbA18"
            placeholder="Please write your wallet.."
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <button type="button" className="btn-cancel" onClick={close}>
          Cancel
        </button>
        <button type="button" className="btn-done" onClick={close}>
          <i className="fa-regular fa-check"></i> Save
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default OptionsModal;
