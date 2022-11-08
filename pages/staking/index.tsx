import Layout from '@components/Layout';
import InputCFNModal from '@components/Modals/InputCFNModal';
import ReactTooltip from 'react-tooltip';
import { useEffect, useState } from 'react';
import { StakingHeader, StakingItem } from '../../components/Staking/StakingTable';
import { useChainContext } from '@src/context/ChainContext';
import { utils } from 'ethers';

interface StakingItemData {
  address: string;
  stake: string;
}

const Staking = () => {
  const [showIncreaseStakeModal, setShowIncreaseStakeModal] = useState(false);
  const [showAnnounceWithdrawalModal, setShowAnnounceWithdrawalModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [stakingItems, setStakingItems] = useState<StakingItemData[]>([]);

  const { nativeContainer } = useChainContext();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let pending = true;

    const loadValidators = async () => {
      if (nativeContainer === undefined) {
        return;
      }

      const { staking } = nativeContainer;

      const stakingItems: StakingItemData[] = [];
      const validators = await staking.getValidators();
      for (const address of validators) {
        const { stake } = await staking.stakes(address);

        stakingItems.push({
          address,
          stake: utils.formatEther(stake),
        });
      }

      if (pending) {
        setStakingItems(stakingItems);
      }
    };

    loadValidators();

    return () => {
      pending = false;
    };
  }, [nativeContainer]);

  return (
    <Layout module="staking" title="Staking" description="Stake CFN to validator transfers and receive rewards">
      <section className="section-page" style={{ paddingBottom: '100px' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-8 col-md-8 col-lg-4 col-xl-4 mx-auto">
              <div className="validator-info mb-4">
                <img
                  src="img/avatar/validator.svg"
                  alt="Validator"
                  className="img-fluid d-block mx-auto validator-avatar"
                />
                <div className="status-validator active-validator">
                  <span>Validator</span>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="current-stake-block">
                      <div className="title-validator">Current Stake</div>
                      <div className="number-block">156</div>
                    </div>
                  </div>
                  <div className="col-sm-6 pr-sm-1">
                    <div className="announced-withdrawal-block">
                      <div className="title-validator">Announced Withdrawal</div>
                      <div className="number-block">12</div>
                    </div>
                  </div>
                  <div className="col-sm-6 pl-sm-1">
                    <div className="withdrawal-time-block">
                      <div className="title-validator">Withdrawal Time</div>
                      <div className="time-withdrawal">
                        <span>13:23:11 - 21.10.22</span>
                      </div>
                    </div>
                  </div>
                </div>

                <a href="#" className="btn-blue" onClick={() => setShowIncreaseStakeModal(true)}>
                  <i className="fa-light fa-circle-arrow-up"></i> Increase Stake
                </a>
                <a href="#" className="btn-blue-light mt-2" onClick={() => setShowAnnounceWithdrawalModal(true)}>
                  <i className="fa-light fa-message-arrow-down"></i> Announce Withdrawal
                </a>
                <a href="#" className="btn-blue-light mt-2">
                  <i className="fa-light fa-circle-arrow-down"></i> Withdraw Stake
                </a>
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
              <div className="table-block">
                <StakingHeader />
                {stakingItems.map((item, i) => {
                  const rank = i + 1;

                  return <StakingItem key={rank} rank={rank} address={item.address} stake={item.stake} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <InputCFNModal
        show={showIncreaseStakeModal}
        maxValue={123}
        maxValueText="Available to stake"
        title="Increase Stake"
        buttonText="Stake"
        close={() => setShowIncreaseStakeModal(false)}
      />

      <InputCFNModal
        show={showAnnounceWithdrawalModal}
        maxValue={16}
        maxValueText="Available to announce"
        title="Announce Withdrawal"
        buttonText="Announce"
        close={() => setShowAnnounceWithdrawalModal(false)}
      />

      {isMounted && (
        <ReactTooltip
          id="transaction-copy"
          className="standart-tooltip"
          type="light"
          effect="solid"
          offset={{ top: 0, right: 0, left: 0, bottom: 0 }}
          border={true}
        >
          Copy to clipboard
        </ReactTooltip>
      )}
    </Layout>
  );
};

export default Staking;
