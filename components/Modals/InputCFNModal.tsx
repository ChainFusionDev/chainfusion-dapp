import { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalTitle } from '@components/Modal';

interface InputCFNModalProps {
  show: boolean;
  maxValue: number;
  maxValueText: string;
  title: string;
  buttonText: string;
  close: () => void;
}

const InputCFNModal = ({ show, maxValue, maxValueText, title, buttonText, close }: InputCFNModalProps) => {
  const [amount, setAmount] = useState<number>(0.0);

  return (
    <Modal show={show} onHide={close}>
      <ModalTitle close={close}>{title}</ModalTitle>
      <ModalBody>
        <div className="form-group">
          <label>Amount:</label>
          <span className="maxsum-input" onClick={() => setAmount(maxValue)}>
            Max
          </span>
          <input
            type="number"
            step="any"
            className="input-standart"
            id="amount"
            value={amount === 0 ? '' : amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Please write amount (CFN)..."
          />
        </div>
        <div className="amount-afterform">
          {maxValueText}: <span onClick={() => setAmount(maxValue)}>{maxValue}</span>
          <div className="token-liquidity-amount">
            <img src="/img/cfn-token.svg" className="cfn-token-icon" alt="CFN" />
            <span>CFN</span>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button type="button" className="btn-cancel" onClick={close}>
          Cancel
        </button>
        <button type="button" className="btn-done" onClick={close}>
          <i className="fa-regular fa-check"></i> {buttonText}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default InputCFNModal;
