import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalTitle } from '@components/Modal';

interface OptionsModalProps {
  isShow: boolean,
  close: () => void,
}

const OptionsModal = ({ isShow, close }: OptionsModalProps) => {
  return (
    <Modal show={isShow} onHide={close}>
      <ModalTitle close={close}>
        Options
      </ModalTitle>
      <ModalBody>
        <div className="form-group">
          <label>Receiver:</label>
          <input
            type="text"
            className="input-standart"
            id="receiver"
            value="0xc46b8n9cd6f7ghde40w3fd45653"
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
