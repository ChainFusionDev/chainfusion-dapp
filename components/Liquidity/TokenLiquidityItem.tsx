import { useChainContext } from '@src/context/ChainContext';
import { Chain, Token } from '@src/types';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, utils } from 'ethers';
import { useEffect, useState } from 'react';

export interface TokenLiquidityItemProps {
  chain: Chain;
  token: Token;

  onAddLiquidity: () => void;
  onRemoveLiquidity: () => void;
}

export const TokenLiquidityItem = ({ chain, token, onAddLiquidity, onRemoveLiquidity }: TokenLiquidityItemProps) => {
  const { account } = useWeb3React();
  const { networkContainer } = useChainContext();

  const [isLoading, setIsLoading] = useState(true);
  const [ourLiquidity, setOurLiquidity] = useState(BigNumber.from(0));
  const [ourRewards, setOurRewards] = useState(BigNumber.from(0));
  const [providedLiquidity, setProvidedLiquidity] = useState(BigNumber.from(0));
  const [availableLiquidity, setAvailableLiquidity] = useState(BigNumber.from(0));

  useEffect(() => {
    let pending = true;

    if (networkContainer.size == 0) {
      return;
    }

    const network = networkContainer.get(chain.identifier);
    if (network?.contracts === undefined) {
      return;
    }

    const tokenAddress = token.chains[chain.identifier];
    if (tokenAddress === undefined) {
      return;
    }

    setProvidedLiquidity(BigNumber.from(0));
    setAvailableLiquidity(BigNumber.from(0));
    setOurLiquidity(BigNumber.from(0));
    setOurRewards(BigNumber.from(0));
    setIsLoading(true);

    const liquidityPools = network.contracts.liqidityPools;

    const loadLiqudity = async () => {
      const providedLiquidityPromise = liquidityPools.providedLiquidity(tokenAddress);
      const availableLiquidityPromise = liquidityPools.availableLiquidity(tokenAddress);
      const ourLiquidityPromise = liquidityPools.liquidityPositions(tokenAddress, account ?? '0x0');
      const ourRewardsPromise = liquidityPools.rewardsOwing(tokenAddress);

      const providedLiquidity = await providedLiquidityPromise;
      const availableLiquidity = await availableLiquidityPromise;
      const ourLiquidity = await ourLiquidityPromise;
      const ourRewards = await ourRewardsPromise;

      if (pending) {
        setProvidedLiquidity(providedLiquidity);
        setAvailableLiquidity(availableLiquidity);
        setOurLiquidity(ourLiquidity.balance);
        setOurRewards(ourRewards);
        setIsLoading(false);
      }
    };

    loadLiqudity();

    return () => {
      pending = false;
    };
  }, [networkContainer, account, chain, token]);

  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-6 mx-auto mx-lg-0">
      <div className="liquidity-inside-block">
        <div className="liquidity-card-token flex-sm-grow-1">
          <img alt="" src={`/img/${token.identifier}.svg`} />
          <span>{token.symbol}</span>
        </div>
        <div className="liquidity-card-left flex-sm-grow-1">
          <div className="liquidity-sum">
            Provided total:{' '}
            <span>
              {isLoading ? '...' : utils.formatEther(providedLiquidity)} <strong>{token.symbol}</strong>
            </span>
          </div>
          <div className="liquidity-sum">
            Available total:{' '}
            <span>
              {isLoading ? '...' : utils.formatEther(availableLiquidity)} <strong>{token.symbol}</strong>
            </span>
          </div>
        </div>
        <div className="liquidity-card-right flex-sm-grow-1">
          <div className="liquidity-provided">
            Provided:
            <div className="liquidity-provided-sum">
              <span>{isLoading ? '...' : utils.formatEther(ourLiquidity)}</span>
              <button className="liquidity-provided-plus" onClick={onAddLiquidity}>
                <i className="fa-regular fa-plus"></i>
              </button>
              <button className="liquidity-provided-minus" onClick={onRemoveLiquidity}>
                <i className="fa-regular fa-minus"></i>
              </button>
            </div>
          </div>
          <div className="liquidity-rewards">
            Rewards:
            <div className="liquidity-rewards-sum">
              <span>{isLoading ? '...' : utils.formatEther(ourRewards)}</span>
              {ourRewards.gt(0) && (
                <button data-toggle="modal" data-target="#modalLiquidityCollect">
                  Collect
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
