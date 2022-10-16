import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalTitle } from '@components/Modal';
import { supportedChains, Chain, supportedTokens, Token } from '@src/config';

interface SelectChainTokenModalProps {
  show: boolean;
  title: string;
  initialChain: Chain;
  initialToken: Token;
  close: () => void;
  select: (chain: Chain, token: Token) => void;
}

const SelectChainTokenModal = ({
  show,
  title,
  initialChain,
  initialToken,
  close: parentClose,
  select,
}: SelectChainTokenModalProps) => {
  const chains = supportedChains();
  const tokens = supportedTokens();

  const [selectedChain, setSelectedChain] = useState<Chain>(initialChain);
  const [selectedToken, setSelectedToken] = useState<Token>(initialToken);

  const [chainFilter, setChainFilter] = useState('');
  const [tokenFilter, setTokenFilter] = useState('');

  const resetFilter = () => {
    setChainFilter('');
    setTokenFilter('');
  };

  const close = () => {
    resetFilter();
    parentClose();
  };

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
              <img className="mr-2" src={`/img/${selectedChain.identifier}.svg`} alt="" />
              {`${selectedChain.name} `} <i className="fa-regular fa-chevron-down"></i>
            </button>
            <ul className="dropdown-menu scroll-select-list" role="menu">
              <div className="form-group search-form">
                <span className="fa-light fa-magnifying-glass form-control-search"></span>
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setChainFilter(e.target.value);
                  }}
                  value={chainFilter}
                  type="text"
                  className="form-control"
                  id="search-blockchain"
                  placeholder="Search..."
                />
              </div>

              <div className="listInCustomDropdown">
                {chains
                  .filter((chain: Chain) => {
                    return (
                      chain.name.toLowerCase().includes(chainFilter.toLowerCase()) ||
                      chain.identifier.toLowerCase().includes(chainFilter.toLowerCase())
                    );
                  })
                  .map((chain: Chain) => {
                    return (
                      <li
                        key={chain.identifier}
                        className={`blockchain-icon ${chain.identifier === selectedChain.identifier ? 'active' : ''}`}
                        onClick={() => {
                          resetFilter();
                          setSelectedChain(chain);
                        }}
                      >
                        <div className="media">
                          <img className="mr-2" src={`/img/${chain.identifier}.svg`} alt="" />
                          <div className="media-body">
                            <h6>{chain.name}</h6>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </div>
            </ul>
          </div>
        </div>

        <div className="form-group">
          <label>Token:</label>

          <div className="select-block">
            <input type="hidden" id="token-to" />
            <button type="button" className="btn btn-default dropdown-toggle select-custom" data-toggle="dropdown">
              <img className="mr-2" src={`/img/${selectedToken.identifier}.svg`} alt="" />
              {`${selectedToken.name} (${selectedToken.symbol})`}
              <i className="fa-regular fa-chevron-down"></i>
            </button>
            <ul className="dropdown-menu scroll-select-list" role="menu">
              <div className="form-group search-form">
                <span className="fa-light fa-magnifying-glass form-control-search"></span>
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTokenFilter(e.target.value);
                  }}
                  value={tokenFilter}
                  type="text"
                  className="form-control"
                  id="search-token"
                  placeholder="Search..."
                />
              </div>

              <div className="listInCustomDropdown">
                {tokens
                  .filter((token: Token) => {
                    return (
                      token.name.toLowerCase().includes(tokenFilter.toLowerCase()) ||
                      token.symbol.toLowerCase().includes(tokenFilter.toLowerCase())
                    );
                  })
                  .map((token: Token) => {
                    return (
                      <li
                        key={token.identifier}
                        className={`token-icon ${token.identifier === selectedToken.identifier ? 'active' : ''}`}
                        onClick={() => {
                          resetFilter();
                          setSelectedToken(token);
                        }}
                      >
                        <div className="media">
                          <img className="mr-2" src={`/img/${token.identifier}.svg`} alt="" />
                          <div className="media-body">
                            <h6>
                              {`${token.symbol} - `}
                              <span>{token.name}</span>
                            </h6>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </div>
            </ul>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button type="button" className="btn-cancel" onClick={close}>
          Cancel
        </button>
        <button
          type="button"
          className="btn-done"
          onClick={() => {
            select(selectedChain, selectedToken);
            close();
          }}
        >
          <i className="fa-regular fa-check"></i> Done
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default SelectChainTokenModal;
