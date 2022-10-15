import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';

interface ModalProps {
  show: boolean;
  children: JSX.Element[] | JSX.Element;
  onHide: () => void;
}

export const Modal = ({ show, children, onHide }: ModalProps) => {
  return (
    <BootstrapModal show={show} onHide={onHide} size={'sm'}>
      <div className="modal-content">{children}</div>
    </BootstrapModal>
  );
};

interface ModalTitleProps {
  children: JSX.Element[] | JSX.Element | string;
  close: () => void;
}

export const ModalTitle = ({ children, close }: ModalTitleProps) => {
  return (
    <div className="modal-header text-center">
      <h4 className="modal-title w-100">{children}</h4>
      <button type="button" className="close" onClick={close}>
        <i className="fa-light fa-xmark-large"></i>
      </button>
    </div>
  );
};

interface ModalBodyProps {
  children: JSX.Element[] | JSX.Element;
}

export const ModalBody = ({ children }: ModalBodyProps) => {
  return <div className="modal-body">{children}</div>;
};

interface ModalFooterProps {
  children: JSX.Element[] | JSX.Element;
}

export const ModalFooter = ({ children }: ModalFooterProps) => {
  return <div className="modal-footer">{children}</div>;
};
