import Layout from '@components/Layout';
import InputTokenModal from '@components/Modals/InputTokenModal';
import Link from 'next/link';
import { useState } from 'react';

const LiquidityManagement = () => {
  const [showAddLiquidityModal, setShowAddLiquidityModal] = useState(false);
  const [showRemoveLiquidityModal, setShowRemoveLiquidityModal] = useState(false);

  return (
    <Layout module="liquidity" title="Liquidity" description="Manage bridge liquidity in blockchais per token">
      <section className="section-page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="breadcrumbs-custom">
                <li className="breadcrumbs-link">
                  <Link href="/liquidity">
                    <a>Liquidity</a>
                  </Link>
                </li>
                <li className="breadcrumbs-link active">Ethereum Liquidity</li>
              </ul>
              <div className="title-page">
                <span>Ethereum</span> Liquidity
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-6 mx-auto mx-lg-0">
              <div className="liquidity-inside-block">
                <div className="liquidity-card-token flex-sm-grow-1">
                  <img alt="" src="/img/liquidity/tokens/tether.svg" />
                  <span>USDT</span>
                </div>
                <div className="liquidity-card-left flex-sm-grow-1">
                  <div className="liquidity-sum">
                    Provided total:{' '}
                    <span>
                      200 <strong>USDT</strong>
                    </span>
                  </div>
                  <div className="liquidity-sum">
                    Available total:{' '}
                    <span>
                      150 <strong>USDT</strong>
                    </span>
                  </div>
                </div>
                <div className="liquidity-card-right flex-sm-grow-1">
                  <div className="liquidity-provided">
                    Provided:
                    <div className="liquidity-provided-sum">
                      <span>50</span>
                      <div className="liquidity-provided-plus" onClick={() => setShowAddLiquidityModal(true)}>
                        <i className="fa-regular fa-plus"></i>
                      </div>
                      <div className="liquidity-provided-minus" onClick={() => setShowRemoveLiquidityModal(true)}>
                        <i className="fa-regular fa-minus"></i>
                      </div>
                    </div>
                  </div>
                  <div className="liquidity-rewards">
                    Rewards total:
                    <div className="liquidity-rewards-sum">
                      <span>10</span>
                      <div className="liquidity-collect" data-toggle="modal" data-target="#modalLiquidityCollect">
                        Collect
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-6 mx-auto mx-lg-0">
              <div className="liquidity-inside-block">
                <div className="liquidity-card-token flex-sm-grow-1">
                  <img alt="" src="/img/liquidity/tokens/usdc.svg" />
                  <span>USDC</span>
                </div>
                <div className="liquidity-card-left flex-sm-grow-1">
                  <div className="liquidity-sum">
                    Provided total:{' '}
                    <span>
                      200 <strong>USDC</strong>
                    </span>
                  </div>
                  <div className="liquidity-sum">
                    Available total:{' '}
                    <span>
                      150 <strong>USDC</strong>
                    </span>
                  </div>
                </div>
                <div className="liquidity-card-right flex-sm-grow-1">
                  <div className="liquidity-provided">
                    Provided:
                    <div className="liquidity-provided-sum">
                      <span>50</span>
                      <div className="liquidity-provided-plus" onClick={() => setShowAddLiquidityModal(true)}>
                        <i className="fa-regular fa-plus"></i>
                      </div>
                      <div className="liquidity-provided-minus" onClick={() => setShowRemoveLiquidityModal(true)}>
                        <i className="fa-regular fa-minus"></i>
                      </div>
                    </div>
                  </div>
                  <div className="liquidity-rewards">
                    Rewards total:
                    <div className="liquidity-rewards-sum">
                      <span>10</span>
                      <div className="liquidity-collect" data-toggle="modal" data-target="#modalLiquidityCollect">
                        Collect
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-6 mx-auto mx-lg-0">
              <div className="liquidity-inside-block">
                <div className="liquidity-card-token flex-sm-grow-1">
                  <img alt="" src="/img/liquidity/tokens/dai.svg" />
                  <span>DAI</span>
                </div>
                <div className="liquidity-card-left flex-sm-grow-1">
                  <div className="liquidity-sum">
                    Provided total:{' '}
                    <span>
                      200 <strong>DAI</strong>
                    </span>
                  </div>
                  <div className="liquidity-sum">
                    Available total:{' '}
                    <span>
                      150 <strong>DAI</strong>
                    </span>
                  </div>
                </div>
                <div className="liquidity-card-right flex-sm-grow-1">
                  <div className="liquidity-provided">
                    Provided:
                    <div className="liquidity-provided-sum">
                      <span>50</span>
                      <div className="liquidity-provided-plus" onClick={() => setShowAddLiquidityModal(true)}>
                        <i className="fa-regular fa-plus"></i>
                      </div>
                      <div className="liquidity-provided-minus" onClick={() => setShowRemoveLiquidityModal(true)}>
                        <i className="fa-regular fa-minus"></i>
                      </div>
                    </div>
                  </div>
                  <div className="liquidity-rewards">
                    Rewards total:
                    <div className="liquidity-rewards-sum">
                      <span>10</span>
                      <div className="liquidity-collect" data-toggle="modal" data-target="#modalLiquidityCollect">
                        Collect
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-6 mx-auto mx-lg-0">
              <div className="liquidity-inside-block">
                <div className="liquidity-card-token flex-sm-grow-1">
                  <img alt="" src="/img/liquidity/tokens/ethereum.svg" />
                  <span>ETH</span>
                </div>
                <div className="liquidity-card-left flex-sm-grow-1">
                  <div className="liquidity-sum">
                    Provided total:{' '}
                    <span>
                      200 <strong>ETH</strong>
                    </span>
                  </div>
                  <div className="liquidity-sum">
                    Available total:{' '}
                    <span>
                      150 <strong>ETH</strong>
                    </span>
                  </div>
                </div>
                <div className="liquidity-card-right flex-sm-grow-1">
                  <div className="liquidity-provided">
                    Provided:
                    <div className="liquidity-provided-sum">
                      <span>50</span>
                      <div className="liquidity-provided-plus" onClick={() => setShowAddLiquidityModal(true)}>
                        <i className="fa-regular fa-plus"></i>
                      </div>
                      <div className="liquidity-provided-minus" onClick={() => setShowRemoveLiquidityModal(true)}>
                        <i className="fa-regular fa-minus"></i>
                      </div>
                    </div>
                  </div>
                  <div className="liquidity-rewards">
                    Rewards total:
                    <div className="liquidity-rewards-sum">
                      <span>10</span>
                      <div className="liquidity-collect" data-toggle="modal" data-target="#modalLiquidityCollect">
                        Collect
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InputTokenModal
        show={showAddLiquidityModal}
        maxValue={55}
        maxValueText="Available to add"
        title="Add Liquidity"
        buttonText="Add"
        buttonIcon="fa-plus"
        close={() => setShowAddLiquidityModal(false)}
      />
      <InputTokenModal
        show={showRemoveLiquidityModal}
        maxValue={30}
        maxValueText="Available to remove"
        title="Remove Liquidity"
        buttonText="Remove"
        buttonIcon="fa-minus"
        close={() => setShowRemoveLiquidityModal(false)}
      />
    </Layout>
  );
};

export default LiquidityManagement;
