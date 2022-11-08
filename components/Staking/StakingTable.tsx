export const StakingHeader = () => {
  return (
    <div className="staking-table-title d-flex">
      <div className="rank pr-2">Rank</div>
      <div className="wallet pl-4 flex-grow-1">Validator</div>
      <div className="amount pl-5 pr-4">Stake</div>
    </div>
  );
};

interface StakingItemProps {
  rank: number;
  address: string;
  stake: string;
}

export const StakingItem = ({ rank, address, stake }: StakingItemProps) => {
  return (
    <div className="staking-table-tr d-flex">
      <div className="rank pr-md-3">
        <p className="d-block d-sm-block d-md-none">Rank:</p>
        {rank}
      </div>
      <div className="wallet pl-md-4 flex-grow-1">
        <p className="d-block d-sm-block d-md-none">Validator:</p>
        <a href="https://explorer.chainfusion.org/" target="_blank" rel="noreferrer">
          {address}
        </a>
        <span className="copy-token-icon" data-toggle="tooltip" data-tip data-for="transaction-copy"></span>
      </div>
      <div className="amount pl-md-4 pr-md-6">
        <p className="d-block d-sm-block d-md-none">Stake:</p>
        {stake}
      </div>
    </div>
  );
};
