import { Chain, Token } from '@src/types';

export interface TokenLiquidityItemProps {
  chain: Chain;
  token: Token;

  onAddLiquidity: () => void;
  onRemoveLiquidity: () => void;
}

export const TokenLiquidityItem = ({ token, onAddLiquidity, onRemoveLiquidity }: TokenLiquidityItemProps) => {
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
              200 <strong>{token.symbol}</strong>
            </span>
          </div>
          <div className="liquidity-sum">
            Available total:{' '}
            <span>
              150 <strong>{token.symbol}</strong>
            </span>
          </div>
        </div>
        <div className="liquidity-card-right flex-sm-grow-1">
          <div className="liquidity-provided">
            Provided:
            <div className="liquidity-provided-sum">
              <span>50</span>
              <div className="liquidity-provided-plus" onClick={onAddLiquidity}>
                <i className="fa-regular fa-plus"></i>
              </div>
              <div className="liquidity-provided-minus" onClick={onRemoveLiquidity}>
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
  );
};
