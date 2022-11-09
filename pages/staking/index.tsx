import Layout from '@components/Layout';
import InputCFNModal from '@components/Modals/InputCFNModal';
import ReactTooltip from 'react-tooltip';
import { useCallback, useEffect, useState } from 'react';
import { StakingHeader, StakingItem } from '../../components/Staking/StakingTable';
import { useChainContext } from '@src/context/ChainContext';
import { getNativeChain } from '@src/config';
import { StakingInfo, ValidatorInfo } from '@src/types';
import { useStaking } from '@store/staking/hooks';
import { utils } from 'ethers';
import { defaultStakingInfo } from '@store/staking/reducer';

const Staking = () => {
  const [showIncreaseStakeModal, setShowIncreaseStakeModal] = useState(false);
  const [showAnnounceWithdrawalModal, setShowAnnounceWithdrawalModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const {
    validators,
    validatorsLoading,
    setValidators,

    stakingInfo,
    stakingInfoLoading,
    setStakingInfo,
    setStakingInfoLoading,
  } = useStaking();

  const { nativeContainer } = useChainContext();
  const nativeChain = getNativeChain();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getValidatorBadgeClass = () => {
    if (stakingInfo.status === 1) {
      return 'active-validator';
    }

    return 'inactive-validator';
  };

  const getValidatorStatus = () => {
    if (stakingInfoLoading) {
      return 'Loading';
    }

    switch (stakingInfo.status) {
      case 0:
        return 'Not a Validator';
      case 1:
        return 'Validator';
      case 2:
        return 'Slashed';
    }

    return 'Unknown';
  };

  const loadValidators = useCallback(async () => {
    if (nativeContainer === undefined) {
      return [];
    }

    const { staking } = nativeContainer;

    const validatorsCount = await staking.getValidatorsCount();
    const validators: ValidatorInfo[] = await staking.listValidators(0, validatorsCount);

    return validators;
  }, [nativeContainer]);

  const loadStakingInfo = useCallback(async () => {
    if (nativeContainer === undefined) {
      return undefined;
    }

    const { staking, account } = nativeContainer;
    const stake = await staking.stakes(account);
    if (stake.stake.eq(0)) {
      return undefined;
    }

    const withdrawalInfo = await staking.withdrawalAnnouncements(account);

    const result: StakingInfo = {
      ...stake,
      withdrawalAmount: withdrawalInfo.amount,
      withdrawalTime: withdrawalInfo.time,
    };

    return result;
  }, [nativeContainer]);

  useEffect(() => {
    if (nativeContainer === undefined) {
      return;
    }

    let pending = true;

    loadValidators().then((validators) => {
      if (pending) {
        setValidators(validators);
      }
    });

    return () => {
      pending = false;
    };
  }, [nativeContainer, setValidators, loadValidators]);

  useEffect(() => {
    if (nativeContainer === undefined) {
      return;
    }

    let pending = true;

    if (stakingInfo.validator !== nativeContainer.account) {
      setStakingInfoLoading();
    }

    loadStakingInfo().then((stakingInfo) => {
      if (pending) {
        if (stakingInfo !== undefined) {
          setStakingInfo(stakingInfo);
        } else {
          setStakingInfo(defaultStakingInfo);
        }
      }
    });

    return () => {
      pending = false;
    };
  }, [nativeContainer, setStakingInfo, setStakingInfoLoading, loadStakingInfo, stakingInfo.validator]);

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
                <div className={`status-validator ${getValidatorBadgeClass()}`}>
                  <span>{getValidatorStatus()}</span>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="current-stake-block">
                      <div className="title-validator">Current Stake</div>
                      <div className="number-block">{`${utils.formatUnits(
                        stakingInfo.stake,
                        nativeChain.nativeCurrency.decimals
                      )} ${nativeChain.nativeCurrency.symbol}`}</div>
                    </div>
                  </div>
                  {!stakingInfo.withdrawalTime.eq(0) && stakingInfo.withdrawalAmount.gt(0) && (
                    <>
                      <div className="col-sm-6 pr-sm-1">
                        <div className="announced-withdrawal-block">
                          <div className="title-validator">Announced Withdrawal</div>
                          <div className="number-block">{`${utils.formatUnits(
                            stakingInfo.withdrawalAmount,
                            nativeChain.nativeCurrency.decimals
                          )} ${nativeChain.nativeCurrency.symbol}`}</div>
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
                    </>
                  )}
                </div>

                {!stakingInfoLoading && stakingInfo.status !== 2 && (
                  // not slashed
                  <a href="#" className="btn-blue" onClick={() => setShowIncreaseStakeModal(true)}>
                    <i className="fa-light fa-circle-arrow-up"></i> Increase Stake
                  </a>
                )}
                {stakingInfo.stake.gt(0) && (
                  // has stake
                  <a href="#" className="btn-blue-light mt-2" onClick={() => setShowAnnounceWithdrawalModal(true)}>
                    <i className="fa-light fa-message-arrow-down"></i> Announce Withdrawal
                  </a>
                )}
                {stakingInfo.withdrawalAmount.gt(0) && stakingInfo.withdrawalTime.lt(new Date().getTime() / 1000) && (
                  // can withdraw stake
                  <a href="#" className="btn-blue-light mt-2">
                    <i className="fa-light fa-circle-arrow-down"></i> Withdraw Stake
                  </a>
                )}
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
              {validatorsLoading ? (
                <h1 className="text-center">Loading</h1>
              ) : (
                <div className="table-block">
                  <StakingHeader />
                  {validators.map((data, i) => {
                    const rank = i + 1;

                    return <StakingItem key={rank} rank={rank} data={data} />;
                  })}
                </div>
              )}
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
