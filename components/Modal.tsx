const Modal = () => {
  return (
    <div>
      <div className="modal animation-modal" id="modalFromSelect">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100">
                Select <strong>From</strong>
              </h4>
              <button type="button" className="close" data-dismiss="modal">
                <i className="fa-light fa-xmark-large"></i>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Blockchain:</label>

                  <div className="select-block">
                    <input type="hidden" id="blockchain-from" />
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle select-custom"
                      data-toggle="dropdown"
                    >
                      <img className="mr-2" src="/img/ethereum.svg" alt="" />
                      Ethereum <i className="fa-regular fa-chevron-down"></i>
                    </button>
                    <ul
                      className="dropdown-menu scroll-select-list"
                      role="menu"
                    >
                      <div className="form-group search-form">
                        <span className="fa-light fa-magnifying-glass form-control-search"></span>
                        <input
                          type="text"
                          className="form-control"
                          id="search-blockchain"
                          placeholder="Search.."
                        />
                      </div>

                      <div className="listInCustomDropdown">
                        <li className="blockchain-icon">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/ethereum.svg"
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Ether</h6>
                            </div>
                          </div>
                        </li>

                        <li className="blockchain-icon active">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/ethereum.svg"
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Ether</h6>
                            </div>
                          </div>
                        </li>

                        <li className="blockchain-icon">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/ethereum.svg"
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Ether</h6>
                            </div>
                          </div>
                        </li>

                        <li className="blockchain-icon">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/ethereum.svg"
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Ether</h6>
                            </div>
                          </div>
                        </li>

                        <li className="blockchain-icon">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/ethereum.svg"
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Ether</h6>
                            </div>
                          </div>
                        </li>

                        <li className="blockchain-icon">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/ethereum.svg"
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Ether</h6>
                            </div>
                          </div>
                        </li>

                        <li className="blockchain-icon">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/ethereum.svg"
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Ether</h6>
                            </div>
                          </div>
                        </li>

                        <li className="blockchain-icon">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/ethereum.svg"
                              alt=""
                            />
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
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle select-custom"
                      data-toggle="dropdown"
                    >
                      <img className="mr-2" src="/img/usdt.svg" alt="" />
                      USDT <i className="fa-regular fa-chevron-down"></i>
                    </button>
                    <ul
                      className="dropdown-menu scroll-select-list"
                      role="menu"
                    >
                      <div className="form-group search-form">
                        <span className="fa-light fa-magnifying-glass form-control-search"></span>
                        <input
                          type="text"
                          className="form-control"
                          id="search-token"
                          placeholder="Search.."
                        />
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
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" data-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn-done">
                <i className="fa-regular fa-check"></i> Done
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal animation-modal" id="modalToSelect">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100">
                Select <strong>To</strong>
              </h4>
              <button type="button" className="close" data-dismiss="modal">
                <i className="fa-light fa-xmark-large"></i>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Blockchain:</label>

                  <div className="select-block">
                    <input type="hidden" id="blockchain-from" />
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle select-custom"
                      data-toggle="dropdown"
                    >
                      <img className="mr-2" src="/img/avalanche.svg" alt="" />
                      Avalanche <i className="fa-regular fa-chevron-down"></i>
                    </button>
                    <ul
                      className="dropdown-menu scroll-select-list"
                      role="menu"
                    >
                      <div className="form-group search-form">
                        <span className="fa-light fa-magnifying-glass form-control-search"></span>
                        <input
                          type="text"
                          className="form-control"
                          id="search-blockchain"
                          placeholder="Search.."
                        />
                      </div>

                      <div className="listInCustomDropdown">
                        <li className="blockchain-icon active">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/avalanche.svg"
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Avalanche</h6>
                            </div>
                          </div>
                        </li>

                        <li className="blockchain-icon">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/avalanche.svg"
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Avalanche</h6>
                            </div>
                          </div>
                        </li>

                        <li className="blockchain-icon">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/avalanche.svg"
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Avalanche</h6>
                            </div>
                          </div>
                        </li>

                        <li className="blockchain-icon">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/avalanche.svg"
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Avalanche</h6>
                            </div>
                          </div>
                        </li>

                        <li className="blockchain-icon">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/avalanche.svg"
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Avalanche</h6>
                            </div>
                          </div>
                        </li>

                        <li className="blockchain-icon">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/avalanche.svg"
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Avalanche</h6>
                            </div>
                          </div>
                        </li>

                        <li className="blockchain-icon">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/avalanche.svg"
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Avalanche</h6>
                            </div>
                          </div>
                        </li>

                        <li className="blockchain-icon">
                          <div className="media">
                            <img
                              className="mr-2"
                              src="/img/avalanche.svg"
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Avalanche</h6>
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
                    <input type="hidden" id="token-from" />
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle select-custom"
                      data-toggle="dropdown"
                    >
                      <img className="mr-2" src="/img/usdt.svg" alt="" />
                      USDT <i className="fa-regular fa-chevron-down"></i>
                    </button>
                    <ul
                      className="dropdown-menu scroll-select-list"
                      role="menu"
                    >
                      <div className="form-group search-form">
                        <span className="fa-light fa-magnifying-glass form-control-search"></span>
                        <input
                          type="text"
                          className="form-control"
                          id="search-token"
                          placeholder="Search.."
                        />
                      </div>

                      <div className="listInCustomDropdown">
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
                      </div>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" data-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn-done">
                <i className="fa-regular fa-check"></i> Done
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal animation-modal" id="modalReceiver">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100">Options</h4>
              <button type="button" className="close" data-dismiss="modal">
                <i className="fa-light fa-xmark-large"></i>
              </button>
            </div>
            <div className="modal-body">
              <form>
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
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" data-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn-done">
                <i className="fa-regular fa-check"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal animation-modal" id="modalConnectwallet">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100">Connect a wallet</h4>
              <button type="button" className="close" data-dismiss="modal">
                <i className="fa-light fa-xmark-large"></i>
              </button>
            </div>
            <div className="modal-body">
              <ul className="wallet-list">
                <li>
                  <img src="/img/wallet/metamask.svg" /> MetaMask
                </li>
                <li>
                  <img src="/img/wallet/walletconnect.svg" /> Wallet Connect
                </li>
                <li>
                  <img src="/img/wallet/binance.svg" /> Binance Wallet
                </li>
                <li>
                  <img src="/img/wallet/coinbase.svg" /> Coinbase Wallet
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="modal animation-modal" id="modalTransferProgress">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100">Please wait</h4>
              <button type="button" className="close" data-dismiss="modal">
                <i className="fa-light fa-xmark-large"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="progress-transfer">
                <div className="percent">
                  <svg>
                    <circle cx="105" cy="105" r="60"></circle>
                    <circle
                      cx="105"
                      cy="105"
                      r="60"
                      style={{ "--percent": 67 } as React.CSSProperties}
                    ></circle>
                  </svg>
                  <div className="number">
                    <h3>
                      67<span>%</span>
                    </h3>
                  </div>
                </div>
              </div>

              <ul className="progress-transfer-list">
                <li>
                  <i className="fa-light fa-circle-check"></i>{" "}
                  <span>1. Confirming transaction on source chain</span>
                </li>
                <li>
                  <i className="fa-light fa-circle-check"></i>{" "}
                  <span>2. Creating distributed signature by validators</span>
                </li>
                <li className="progress-active">
                  <i className="fa-light fa-spinner-third"></i>{" "}
                  <span>3. Confirming transaction on destination chain</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
