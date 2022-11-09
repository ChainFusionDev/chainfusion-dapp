import { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalTitle } from '@components/Modal';
import { BigNumber, utils } from 'ethers';

interface InputCFNModalProps {
  show: boolean;
  decimals: number;
  maxValue: BigNumber;
  maxValueText: string;
  title: string;
  buttonText: string;
  submit: (amount: BigNumber) => void;
  close: () => void;
}

const InputCFNModal = ({
  show,
  decimals,
  maxValue,
  maxValueText,
  title,
  buttonText,
  submit,
  close,
}: InputCFNModalProps) => {
  const [amount, setAmount] = useState<string>('');

  return (
    <Modal show={show} onHide={close}>
      <ModalTitle close={close}>{title}</ModalTitle>
      <ModalBody>
        <div className="form-group">
          <label>Amount:</label>
          {maxValue.gt(0) && (
            <span className="maxsum-input" onClick={() => setAmount(utils.formatUnits(maxValue, decimals))}>
              Max
            </span>
          )}
          <input
            type="text"
            step="any"
            className="input-standart"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Please write amount (CFN)..."
          />
        </div>
        {maxValue.gt(0) ? (
          <div className="amount-afterform">
            {maxValueText}:{' '}
            <span onClick={() => setAmount(utils.formatUnits(maxValue, decimals))}>
              {utils.formatUnits(maxValue, decimals)}
            </span>
            <div className="token-liquidity-amount">
              <img src="/img/cfn-token.svg" className="cfn-token-icon" alt="CFN" />
              <span>CFN</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </ModalBody>
      <ModalFooter>
        <button type="button" className="btn-cancel" onClick={close}>
          Cancel
        </button>
        <button
          type="button"
          className="btn-done"
          onClick={() => {
            submit(utils.parseUnits(amount, decimals));
            close();
            setAmount('');
          }}
        >
          <i className="fa-regular fa-check"></i> {buttonText}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default InputCFNModal;
