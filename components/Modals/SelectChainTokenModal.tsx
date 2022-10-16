import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalTitle } from '@components/Modal';

interface SelectChainTokenModalProps {
  show: boolean;
  title: string;
  close: () => void;
}

const SelectChainTokenModal = ({ show, title, close }: SelectChainTokenModalProps) => {
  return (
    <Modal show={show} size="sm" onHide={close}>
      <ModalTitle close={close}>
        <span>
          Select <strong>{title}</strong>
        </span>
      </ModalTitle>
      <ModalBody>
        <div className="form-group">
          <label>Blockchain:</label>

          <div className="select-block">
            <input type="hidden" id="blockchain-from" />
            <button type="button" className="btn btn-default dropdown-toggle select-custom" data-toggle="dropdown">
              <img className="mr-2" src="/img/ethereum.svg" alt="" />
              Ethereum <i className="fa-regular fa-chevron-down"></i>
            </button>
            <ul className="dropdown-menu scroll-select-list" role="menu">
              <div className="form-group search-form">
                <span className="fa-light fa-magnifying-glass form-control-search"></span>
                <input type="text" className="form-control" id="search-blockchain" placeholder="Search.." />
              </div>

              <div className="listInCustomDropdown">
                <li className="blockchain-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/ethereum.svg" alt="" />
                    <div className="media-body">
                      <h6>Ether</h6>
                    </div>
                  </div>
                </li>

                <li className="blockchain-icon active">
                  <div className="media">
                    <img className="mr-2" src="/img/ethereum.svg" alt="" />
                    <div className="media-body">
                      <h6>Ether</h6>
                    </div>
                  </div>
                </li>

                <li className="blockchain-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/ethereum.svg" alt="" />
                    <div className="media-body">
                      <h6>Ether</h6>
                    </div>
                  </div>
                </li>

                <li className="blockchain-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/ethereum.svg" alt="" />
                    <div className="media-body">
                      <h6>Ether</h6>
                    </div>
                  </div>
                </li>

                <li className="blockchain-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/ethereum.svg" alt="" />
                    <div className="media-body">
                      <h6>Ether</h6>
                    </div>
                  </div>
                </li>

                <li className="blockchain-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/ethereum.svg" alt="" />
                    <div className="media-body">
                      <h6>Ether</h6>
                    </div>
                  </div>
                </li>

                <li className="blockchain-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/ethereum.svg" alt="" />
                    <div className="media-body">
                      <h6>Ether</h6>
                    </div>
                  </div>
                </li>

                <li className="blockchain-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/ethereum.svg" alt="" />
                    <div className="media-body">
                      <h6>Ether</h6>
                    </div>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>

        <div className="form-group">
          <label>Token:</label>

          <div className="select-block">
            <input type="hidden" id="token-to" />
            <button type="button" className="btn btn-default dropdown-toggle select-custom" data-toggle="dropdown">
              <img className="mr-2" src="/img/usdt.svg" alt="" />
              USDT <i className="fa-regular fa-chevron-down"></i>
            </button>
            <ul className="dropdown-menu scroll-select-list" role="menu">
              <div className="form-group search-form">
                <span className="fa-light fa-magnifying-glass form-control-search"></span>
                <input type="text" className="form-control" id="search-token" placeholder="Search.." />
              </div>

              <div className="listInCustomDropdown">
                <li className="token-icon active">
                  <div className="media">
                    <img className="mr-2" src="/img/usdt.svg" alt="" />
                    <div className="media-body">
                      <h6>
                        USDT - <span>USD Tether</span>
                      </h6>
                    </div>
                  </div>
                </li>
                <li className="token-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/usdt.svg" alt="" />
                    <div className="media-body">
                      <h6>
                        USDT - <span>USD Tether</span>
                      </h6>
                    </div>
                  </div>
                </li>
                <li className="token-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/usdt.svg" alt="" />
                    <div className="media-body">
                      <h6>
                        USDT - <span>USD Tether</span>
                      </h6>
                    </div>
                  </div>
                </li>
                <li className="token-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/usdt.svg" alt="" />
                    <div className="media-body">
                      <h6>
                        USDT - <span>USD Tether</span>
                      </h6>
                    </div>
                  </div>
                </li>
                <li className="token-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/usdt.svg" alt="" />
                    <div className="media-body">
                      <h6>
                        USDT - <span>USD Tether</span>
                      </h6>
                    </div>
                  </div>
                </li>
                <li className="token-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/usdt.svg" alt="" />
                    <div className="media-body">
                      <h6>
                        USDT - <span>USD Tether</span>
                      </h6>
                    </div>
                  </div>
                </li>
                <li className="token-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/usdt.svg" alt="" />
                    <div className="media-body">
                      <h6>
                        USDT - <span>USD Tether</span>
                      </h6>
                    </div>
                  </div>
                </li>
                <li className="token-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/usdt.svg" alt="" />
                    <div className="media-body">
                      <h6>
                        USDT - <span>USD Tether</span>
                      </h6>
                    </div>
                  </div>
                </li>
                <li className="token-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/usdt.svg" alt="" />
                    <div className="media-body">
                      <h6>
                        USDT - <span>USD Tether</span>
                      </h6>
                    </div>
                  </div>
                </li>
                <li className="token-icon">
                  <div className="media">
                    <img className="mr-2" src="/img/usdt.svg" alt="" />
                    <div className="media-body">
                      <h6>
                        USDT - <span>USD Tether</span>
                      </h6>
                    </div>
                  </div>
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
          <i className="fa-regular fa-check"></i> Done
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default SelectChainTokenModal;
