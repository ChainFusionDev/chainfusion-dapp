import React from 'react';
import { Modal, ModalBody, ModalTitle } from '@components/Modal';

interface TransferModalProps {
  show: boolean;
  stage: number;
  stageLinks: Map<number, string>;
  close: () => void;
}

const TransferModal = ({ show, stage, stageLinks, close }: TransferModalProps) => {
  const percent = Math.min(Math.round(((stage - 1) / 3) * 100), 100);

  return (
    <Modal show={show} onHide={close}>
      <ModalTitle close={close}>{stage < 4 ? 'Transferring Tokens' : 'Done!'}</ModalTitle>
      <ModalBody>
        <div className="progress-transfer">
          <div className="percent">
            <svg>
              <circle cx="105" cy="105" r="60"></circle>
              <circle cx="105" cy="105" r="60" style={{ '--percent': percent } as React.CSSProperties}></circle>
            </svg>
            <div className="number">
              <h3>
                {percent}
                <span>%</span>
              </h3>
            </div>
          </div>
        </div>
        <ul className="progress-transfer-list">
          <ProgressItem
            stage={1}
            activeStage={stage}
            link={stageLinks.get(1)}
            message="Confirming deposit transaction"
          />
          <ProgressItem stage={2} activeStage={stage} link={stageLinks.get(2)} message="Registering transfer event" />
          <ProgressItem
            stage={3}
            activeStage={stage}
            link={stageLinks.get(3)}
            message="Receiving transfer on destination chain"
          />
        </ul>
      </ModalBody>
    </Modal>
  );
};

interface ProgresItemProps {
  stage: number;
  activeStage: number;
  link: string | undefined;
  message: string;
}

const ProgressItem = ({ stage, activeStage, link, message }: ProgresItemProps) => {
  return (
    <li className={`${stage >= activeStage ? 'progress-active' : ''}`}>
      <i className={`fa-light ${stage < activeStage ? 'fa-circle-check' : 'fa-spinner-third'}`}></i>{' '}
      <span>{message}</span>
      {link !== undefined && (
        <a href={link} className="progress-link" target="_blank" rel="noreferrer">
          <i className="fa-regular fa-arrow-up-right-from-square"></i>
        </a>
      )}
    </li>
  );
};

export default TransferModal;
