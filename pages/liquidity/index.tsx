import Layout from '@components/Layout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

const Liquidity = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Layout module="liquidity" title="Liquidity" description="Manage bridge liquidity in blockchais per token">
      <section className="section-page">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-9 col-md-6 col-lg-4 mx-auto mx-lg-0">
              <Link href="/liquidity/ethereum">
                <div className="liquidity-block">
                  <div className="liquidity-title-pool">
                    <img alt="" src="/img/liquidity/blockchain/ethereum-eth.svg" /> Ethereum Pool
                  </div>
                  <div className="liquidity-info">
                    <div className="liquidity-tokens">
                      <span>Tokens</span>
                      <ul className="liquidity-tokens-list">
                        <li>
                          <img alt="" src="/img/liquidity/tokens/tether.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/usdc.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/dai.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/ethereum.svg" />
                        </li>
                      </ul>
                    </div>
                    <div className="liquidity-tvl">
                      <span>TVL</span>
                      <div className="liquidity-sum">$42 742 352</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-9 col-md-6 col-lg-4 mx-sm-auto">
              <Link href="/liquidity/avalanche">
                <div className="liquidity-block">
                  <div className="liquidity-title-pool">
                    <img alt="" src="/img/liquidity/blockchain/avalanche-avax-logo.svg" /> Avalanche Pool
                  </div>
                  <div className="liquidity-info">
                    <div className="liquidity-tokens">
                      <span>Tokens</span>
                      <ul className="liquidity-tokens-list">
                        <li>
                          <img alt="" src="/img/liquidity/tokens/tether.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/usdc.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/dai.svg" />
                        </li>
                      </ul>
                    </div>
                    <div className="liquidity-tvl">
                      <span>TVL</span>
                      <div className="liquidity-sum">$17 311 215</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-9 col-md-6 col-lg-4 mx-sm-auto">
              <Link href="/liquidity/polygon">
                <div className="liquidity-block">
                  <div className="liquidity-title-pool">
                    <img alt="" src="/img/liquidity/blockchain/polygon.svg" /> Polygon Pool
                  </div>
                  <div className="liquidity-info">
                    <div className="liquidity-tokens">
                      <span>Tokens</span>
                      <ul className="liquidity-tokens-list">
                        <li>
                          <img alt="" src="/img/liquidity/tokens/tether.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/usdc.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/wbtc.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/aave.svg" />
                        </li>
                        <li>
                          <span className="liquidity-tokens-tooltip" data-tip data-for="liquidity-tokens-tooltip">
                            +2
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="liquidity-tvl">
                      <span>TVL</span>
                      <div className="liquidity-sum">$19 452 131</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-9 col-md-6 col-lg-4 mx-auto mx-lg-0">
              <Link href="/liquidity/ethereum">
                <div className="liquidity-block">
                  <div className="liquidity-title-pool">
                    <img alt="" src="/img/liquidity/blockchain/ethereum-eth.svg" /> Ethereum Pool
                  </div>
                  <div className="liquidity-info">
                    <div className="liquidity-tokens">
                      <span>Tokens</span>
                      <ul className="liquidity-tokens-list">
                        <li>
                          <img alt="" src="/img/liquidity/tokens/tether.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/usdc.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/dai.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/ethereum.svg" />
                        </li>
                      </ul>
                    </div>
                    <div className="liquidity-tvl">
                      <span>TVL</span>
                      <div className="liquidity-sum">$42 742 352</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-9 col-md-6 col-lg-4 mx-sm-auto">
              <Link href="/liquidity/avalanche">
                <div className="liquidity-block">
                  <div className="liquidity-title-pool">
                    <img alt="" src="/img/liquidity/blockchain/avalanche-avax-logo.svg" /> Avalanche Pool
                  </div>
                  <div className="liquidity-info">
                    <div className="liquidity-tokens">
                      <span>Tokens</span>
                      <ul className="liquidity-tokens-list">
                        <li>
                          <img alt="" src="/img/liquidity/tokens/tether.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/usdc.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/dai.svg" />
                        </li>
                      </ul>
                    </div>
                    <div className="liquidity-tvl">
                      <span>TVL</span>
                      <div className="liquidity-sum">$17 311 215</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-9 col-md-6 col-lg-4 mx-sm-auto">
              <Link href="/liquidity/polygon">
                <div className="liquidity-block">
                  <div className="liquidity-title-pool">
                    <img alt="" src="/img/liquidity/blockchain/polygon.svg" /> Polygon Pool
                  </div>
                  <div className="liquidity-info">
                    <div className="liquidity-tokens">
                      <span>Tokens</span>
                      <ul className="liquidity-tokens-list">
                        <li>
                          <img alt="" src="/img/liquidity/tokens/tether.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/usdc.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/wbtc.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/aave.svg" />
                        </li>
                        <li>
                          <span className="liquidity-tokens-tooltip" data-tip data-for="liquidity-tokens-tooltip">
                            +2
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="liquidity-tvl">
                      <span>TVL</span>
                      <div className="liquidity-sum">$19 452 131</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-9 col-md-6 col-lg-4 mx-auto mx-lg-0">
              <Link href="/liquidity/ethereum">
                <div className="liquidity-block">
                  <div className="liquidity-title-pool">
                    <img alt="" src="/img/liquidity/blockchain/ethereum-eth.svg" /> Ethereum Pool
                  </div>
                  <div className="liquidity-info">
                    <div className="liquidity-tokens">
                      <span>Tokens</span>
                      <ul className="liquidity-tokens-list">
                        <li>
                          <img alt="" src="/img/liquidity/tokens/tether.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/usdc.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/dai.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/ethereum.svg" />
                        </li>
                      </ul>
                    </div>
                    <div className="liquidity-tvl">
                      <span>TVL</span>
                      <div className="liquidity-sum">$42 742 352</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-9 col-md-6 col-lg-4 mx-sm-auto">
              <Link href="/liquidity/avalanche">
                <div className="liquidity-block">
                  <div className="liquidity-title-pool">
                    <img alt="" src="/img/liquidity/blockchain/avalanche-avax-logo.svg" /> Avalanche Pool
                  </div>
                  <div className="liquidity-info">
                    <div className="liquidity-tokens">
                      <span>Tokens</span>
                      <ul className="liquidity-tokens-list">
                        <li>
                          <img alt="" src="/img/liquidity/tokens/tether.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/usdc.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/dai.svg" />
                        </li>
                      </ul>
                    </div>
                    <div className="liquidity-tvl">
                      <span>TVL</span>
                      <div className="liquidity-sum">$17 311 215</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-9 col-md-6 col-lg-4 mx-sm-auto">
              <Link href="/liquidity/polygon">
                <div className="liquidity-block">
                  <div className="liquidity-title-pool">
                    <img alt="" src="/img/liquidity/blockchain/polygon.svg" /> Polygon Pool
                  </div>
                  <div className="liquidity-info">
                    <div className="liquidity-tokens">
                      <span>Tokens</span>
                      <ul className="liquidity-tokens-list">
                        <li>
                          <img alt="" src="/img/liquidity/tokens/tether.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/usdc.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/wbtc.svg" />
                        </li>
                        <li>
                          <img alt="" src="/img/liquidity/tokens/aave.svg" />
                        </li>
                        <li>
                          <span className="liquidity-tokens-tooltip" data-tip data-for="liquidity-tokens-tooltip">
                            +2
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="liquidity-tvl">
                      <span>TVL</span>
                      <div className="liquidity-sum">$19 452 131</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {isMounted && (
        <ReactTooltip
          id="liquidity-tokens-tooltip"
          className="hover-tooltip"
          type="light"
          effect="solid"
          offset={{ top: 0, right: 0, left: 0, bottom: 0 }}
          border={true}
        >
          <img alt="" className="tokens-tooltip-img" src="/img/liquidity/tokens/ethereum.svg" />
          <img alt="" className="tokens-tooltip-img" src="/img/liquidity/tokens/dai.svg" />
        </ReactTooltip>
      )}
    </Layout>
  );
};

export default Liquidity;
