import { getSupportedTokens } from '@src/config';
import { Chain } from '@src/types';
import Link from 'next/link';

export interface ChainLiquidityItemProps {
  chain: Chain;
}

export const ChainLiquidityItem = ({ chain }: ChainLiquidityItemProps) => {
  const tokens = getSupportedTokens().filter((token) => token.chains[chain.identifier] !== undefined);
  const tokenItems = tokens.slice(0, 3).map((token) => {
    return (
      <li key={token.identifier}>
        <img alt="" src={`/img/${token.identifier}.svg`} />
      </li>
    );
  });

  return (
    <div className="col-12 col-sm-9 col-md-6 col-lg-4 mx-auto mx-lg-0">
      <Link href={`/liquidity/${chain.identifier}`}>
        <div className="liquidity-block">
          <div className="liquidity-title-pool">
            <img alt={`${chain.name} Logo`} src={`/img/${chain.identifier}.svg`} /> {chain.name} Pool
          </div>
          <div className="liquidity-info">
            <div className="liquidity-tokens">
              <span>Tokens</span>
              <ul className="liquidity-tokens-list">{tokenItems}</ul>
            </div>
            <div className="liquidity-tvl">
              <span>TVL</span>
              <div className="liquidity-sum">$10 000</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
