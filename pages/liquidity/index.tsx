import Layout from '@components/Layout';
import { ChainLiquidityItem } from '@components/Liquidity/ChainLiquidityItem';
import { getSupportedChains } from '@src/config';
import { Chain } from '@src/types';
import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

const Liquidity = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const supportedChains = getSupportedChains();
  const liquidityItems = supportedChains.map((chain: Chain) => {
    return <ChainLiquidityItem key={chain.identifier} chain={chain} />;
  });

  console.log('Render main');

  return (
    <Layout module="liquidity" title="Liquidity" description="Manage bridge liquidity in blockchais per token">
      <section className="section-page">
        <div className="container">
          <div className="row">{liquidityItems}</div>
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
