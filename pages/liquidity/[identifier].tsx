import Layout from '@components/Layout';
import { TokenLiquidityItem } from '@components/Liquidity/TokenLiquidityItem';
import InputTokenModal from '@components/Modals/InputTokenModal';
import { getChain, getSupportedTokens } from '@src/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const LiquidityManagement = () => {
  const router = useRouter();

  const [showAddLiquidityModal, setShowAddLiquidityModal] = useState(false);
  const [showRemoveLiquidityModal, setShowRemoveLiquidityModal] = useState(false);

  const { identifier } = router.query;

  if (identifier === undefined) {
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
                  <li className="breadcrumbs-link active">Chain Liquidity</li>
                </ul>
                <div className="title-page">
                  <span>Chain</span> Liquidity
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const chain = getChain(identifier as string);
  const tokens = getSupportedTokens().filter((token) => token.chains[chain.identifier] !== undefined);

  const tokenItems = tokens.map((token) => {
    return (
      <TokenLiquidityItem
        key={token.identifier}
        chain={chain}
        token={token}
        onAddLiquidity={() => setShowAddLiquidityModal(true)}
        onRemoveLiquidity={() => setShowRemoveLiquidityModal(true)}
      />
    );
  });

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
                <li className="breadcrumbs-link active">{chain.name} Liquidity</li>
              </ul>
              <div className="title-page">
                <span>{chain.name}</span> Liquidity
              </div>
            </div>
            {tokenItems}
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
