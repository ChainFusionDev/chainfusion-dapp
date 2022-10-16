import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalTitle } from '@components/Modal';

interface SlashingProposalModalProps {
  show: boolean;
  close: () => void;
}

const SlashingProposalModal = ({ show, close }: SlashingProposalModalProps) => {
  return (
    <Modal show={show} onHide={close}>
      <ModalTitle close={close}>Creating a Proposal</ModalTitle>
      <ModalBody>
        <div className="form-group">
          <label>Reason:</label>
          <textarea id="reason-text" rows={5} placeholder="Please write the text of the reason..."></textarea>
        </div>

        <div className="form-group">
          <label>Select validator address:</label>

          <div className="select-block select-slashing-adress">
            <input type="hidden" id="select-validator-adress" />
            <button type="button" className="btn btn-default dropdown-toggle select-custom" data-toggle="dropdown">
              0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
              <i className="fa-regular fa-chevron-down"></i>
            </button>
            <ul className="dropdown-menu scroll-select-list" role="menu">
              <div className="form-group search-form">
                <span className="fa-light fa-magnifying-glass form-control-search"></span>
                <input type="text" className="form-control" id="search-adress-validator" placeholder="Search.." />
              </div>

              <div className="listInCustomDropdown">
                <li className="slashing-adress-list active">
                  <p>0x0661F0297bC6234d8b31782Cd1926EC101dF2d27</p>
                </li>
                <li className="slashing-adress-list">
                  <p>0x0661F0297bC6234d8b31782Cd1926EC101dF2d27</p>
                </li>
                <li className="slashing-adress-list">
                  <p>0x0661F0297bC6234d8b31782Cd1926EC101dF2d27</p>
                </li>
                <li className="slashing-adress-list">
                  <p>0x0661F0297bC6234d8b31782Cd1926EC101dF2d27</p>
                </li>
                <li className="slashing-adress-list">
                  <p>0x0661F0297bC6234d8b31782Cd1926EC101dF2d27</p>
                </li>
                <li className="slashing-adress-list">
                  <p>0x0661F0297bC6234d8b31782Cd1926EC101dF2d27</p>
                </li>
                <li className="slashing-adress-list">
                  <p>0x0661F0297bC6234d8b31782Cd1926EC101dF2d27</p>
                </li>
                <li className="slashing-adress-list">
                  <p>0x0661F0297bC6234d8b31782Cd1926EC101dF2d27</p>
                </li>
                <li className="slashing-adress-list">
                  <p>0x0661F0297bC6234d8b31782Cd1926EC101dF2d27</p>
                </li>
                <li className="slashing-adress-list">
                  <p>0x0661F0297bC6234d8b31782Cd1926EC101dF2d27</p>
                </li>
                <li className="slashing-adress-list">
                  <p>0x0661F0297bC6234d8b31782Cd1926EC101dF2d27</p>
                </li>
                <li className="slashing-adress-list">
                  <p>0x0661F0297bC6234d8b31782Cd1926EC101dF2d27</p>
                </li>
                <li className="slashing-adress-list">
                  <p>0x0661F0297bC6234d8b31782Cd1926EC101dF2d27</p>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button type="button" className="btn-cancel" onClick={close}>
          Cancel
        </button>
        <button type="button" className="btn-done" onClick={close}>
          <i className="fa-regular fa-check"></i> Create
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default SlashingProposalModal;
