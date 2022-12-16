import { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalTitle } from '@components/Modal';
import { useBridge } from '@store/bridge/hooks';
import { utils } from 'ethers';
import { useWeb3React } from '@web3-react/core';

interface OptionsModalProps {
  show: boolean;
  close: () => void;
}

const OptionsModal = ({ show, close }: OptionsModalProps) => {
  const { account } = useWeb3React();
  const { receiver, setReceiver } = useBridge();
  const [receiverOption, setReceiverOption] = useState(receiver);

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
            value={receiverOption ?? ''}
            onChange={(e) => setReceiverOption(e.target.value)}
            placeholder={account ?? 'Enter transfer receiver address'}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="btn-cancel"
          onClick={() => {
            setReceiverOption(receiver);
            close();
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn-done"
          onClick={() => {
            if (utils.isAddress(receiverOption ?? '') || receiverOption === '' || receiverOption === undefined) {
              setReceiver(receiverOption);
            } else {
              setReceiverOption(undefined);
            }

            close();
          }}
        >
          <i className="fa-regular fa-check"></i> Save
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default OptionsModal;
