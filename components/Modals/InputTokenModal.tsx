import { Modal, ModalBody, ModalFooter, ModalTitle } from '@components/Modal';
import { useState } from 'react';

interface InputTokenModalProps {
  show: boolean;
  maxValue: number;
  maxValueText: string;
  title: string;
  buttonText: string;
  buttonIcon?: string;
  close: () => void;
}

const InputTokenModal = ({
  show,
  maxValue,
  maxValueText,
  title,
  buttonText,
  buttonIcon,
  close,
}: InputTokenModalProps) => {
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
            id="amount-liquidity-add"
            value={amount === 0 ? '' : amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Please write amount..."
          />
        </div>
        <div className="amount-afterform">
          {maxValueText}: <button onClick={() => setAmount(maxValue)}>{maxValue}</button>
          <div className="token-liquidity-amount">
            <img alt="" src="/img/usdt.svg" />
            <span>USDT</span>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button type="button" className="btn-cancel" onClick={close}>
          Cancel
        </button>
        <button type="button" className="btn-done" onClick={close}>
          <i className={`fa-regular ${buttonIcon ?? 'fa-check'}`}></i> {buttonText}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default InputTokenModal;
