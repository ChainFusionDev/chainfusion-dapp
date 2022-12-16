import { MockToken__factory } from '@chainfusion/chainfusion-contracts';
import { getSupportedTokens } from '@src/config';
import { useChainContext } from '@src/context/ChainContext';
import { Chain } from '@src/types';
import { BigNumber, utils } from 'ethers';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface ChainLiquidityItemProps {
  chain: Chain;
}

export const ChainLiquidityItem = ({ chain }: ChainLiquidityItemProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tvl, setTVL] = useState(BigNumber.from(0));

  const { networkContainer } = useChainContext();

  const tokens = getSupportedTokens().filter((token) => token.chains[chain.identifier] !== undefined);

  useEffect(() => {
    let pending = true;

    if (networkContainer.size == 0) {
      return;
    }

    const network = networkContainer.get(chain.identifier);
    if (network?.contracts === undefined) {
      return;
    }

    const liquidityPoolsAddress = network.contracts.liqidityPools.address;

    const loadTVL = async () => {
      let tvl: BigNumber = BigNumber.from(0);
      const tokenTVLPromises: Promise<BigNumber>[] = [];
      for (const token of tokens) {
        const tokenAddress = token.chains[chain.identifier];
        if (tokenAddress === undefined) {
          continue;
        }

        const mockTokenFactory = new MockToken__factory(network.provider.getSigner());
        const mockToken = mockTokenFactory.attach(tokenAddress);

        tokenTVLPromises.push(mockToken.balanceOf(liquidityPoolsAddress));
      }

      for (const tvlPromise of tokenTVLPromises) {
        tvl = tvl.add(await tvlPromise);
      }

      if (pending) {
        setTVL(tvl.sub(tvl.mod(BigNumber.from(10).pow(18))));
        setIsLoading(false);
      }
    };

    loadTVL();

    return () => {
      pending = false;
    };
  }, [networkContainer, chain, tokens]);

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
              <div className="liquidity-sum">{isLoading ? 'Loading' : `$${utils.commify(utils.formatEther(tvl))}`}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
