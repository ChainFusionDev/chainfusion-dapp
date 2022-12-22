import Layout from '@components/Layout';
import InputCFNModal from '@components/Modals/InputCFNModal';
import ReactTooltip from 'react-tooltip';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { StakingHeader, StakingItem, SkeletonStakingItem } from '@components/Staking/StakingTable';
import { useChainContext } from '@src/context/ChainContext';
import { getNativeChain } from '@src/config';
import { StakingInfo, ValidatorInfo } from '@src/types';
import { useStaking } from '@store/staking/hooks';
import { BigNumber, utils } from 'ethers';
import { defaultStakingInfo } from '@store/staking/reducer';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { MsgAnnounceSuccess, MsgStakeSuccess, MsgWithdrawSuccess } from '@components/Alerts/Staking';

const Staking = () => {
  const [showIncreaseStakeModal, setShowIncreaseStakeModal] = useState(false);
  const [showAnnounceWithdrawalModal, setShowAnnounceWithdrawalModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
  const [stakingPending, setStakingPending] = useState(false);
  const [announcePending, setAnnouncePending] = useState(false);
  const [withdrawalPending, setWithdrawalPending] = useState(false);

  const {
    validators,
    validatorsLoading,
    setValidators,

    stakingInfo,
    stakingInfoLoading,
    setStakingInfo,
    setStakingInfoLoading,
  } = useStaking();

  const { isActive } = useWeb3React();
  const { nativeContainer, switchNetwork, showConnectWalletDialog } = useChainContext();
  const nativeChain = getNativeChain();

  const nativeConnected = nativeContainer?.connected ?? false;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getValidatorIcon = () => {
    if (stakingInfo.status === 1) {
      return 'validator';
    }

    return 'not-validator';
  };

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

    const sortedValidators = [...validators];
    sortedValidators.sort((a, b) => {
      if (a.stake.eq(b.stake)) {
        return a.validator.localeCompare(b.validator);
      }

      return a.stake.lt(b.stake) ? 1 : -1;
    });

    return sortedValidators;
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

    const withdrawalPeriod = await staking.withdrawalPeriod();

    const withdrawalInfo = await staking.withdrawalAnnouncements(account);

    const result: StakingInfo = {
      ...stake,
      withdrawalAmount: withdrawalInfo.amount,
      withdrawalTime: withdrawalInfo.time.add(withdrawalPeriod),
    };

    return result;
  }, [nativeContainer]);

  const loadBalance = useCallback(async () => {
    if (nativeContainer === undefined) {
      return undefined;
    }

    const { provider, account } = nativeContainer;
    return await provider.getBalance(account);
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
  }, [nativeContainer, stakingPending, withdrawalPending, setValidators, loadValidators]);

  useEffect(() => {
    if (nativeContainer === undefined) {
      return;
    }

    let pending = true;

    setBalance(BigNumber.from(0));
    setStakingInfoLoading();

    loadStakingInfo().then((stakingInfo) => {
      if (pending) {
        if (stakingInfo !== undefined) {
          setStakingInfo(stakingInfo);
        } else {
          setStakingInfo(defaultStakingInfo);
        }
      }
    });

    loadBalance().then((balance) => {
      if (pending) {
        if (balance === undefined) {
          setBalance(BigNumber.from(0));
        } else {
          setBalance(balance);
        }
      }
    });

    return () => {
      pending = false;
    };
  }, [
    nativeContainer,
    stakingPending,
    announcePending,
    withdrawalPending,
    setStakingInfo,
    setStakingInfoLoading,
    loadStakingInfo,
    loadBalance,
  ]);

  const buttons: ReactElement[] = [];

  if (nativeConnected) {
    if (!stakingInfoLoading && stakingInfo.status !== 2) {
      buttons.push(
        <button
          disabled={stakingPending}
          key="increase-stake"
          className="btn-blue"
          onClick={() => setShowIncreaseStakeModal(true)}
        >
          <i className={`fa-light ${stakingPending ? 'fa-spinner' : 'fa-circle-arrow-up'}`}></i> Increase Stake
        </button>
      );
    }

    if (stakingInfo.stake.gt(0)) {
      buttons.push(
        <button
          disabled={announcePending}
          key="announce-withdrawal"
          className="btn-blue-light mt-2"
          onClick={() => setShowAnnounceWithdrawalModal(true)}
        >
          <i className={`fa-light ${announcePending ? 'fa-spinner' : 'fa-message-arrow-down'}`}></i> Announce Withdrawal
        </button>
      );
    }

    if (stakingInfo.withdrawalAmount.gt(0) && stakingInfo.withdrawalTime.lt(Math.round(new Date().getTime() / 1000))) {
      buttons.push(
        <button
          disabled={withdrawalPending}
          key="withdraw-stake"
          className="btn-blue-light mt-2"
          onClick={async () => {
            if (nativeContainer === undefined) {
              return;
            }

            const { staking } = nativeContainer;
            setWithdrawalPending(true);
            await (await staking.withdraw()).wait();
            setWithdrawalPending(false);

            toast(<MsgWithdrawSuccess />);
          }}
        >
          <i className={`fa-light ${withdrawalPending ? 'fa-spinner' : 'fa-circle-arrow-down'}`}></i> Withdraw Stake
        </button>
      );
    }
  } else if (isActive) {
    buttons.push(
      <button key="switch-network" className="btn-blue" onClick={() => switchNetwork(nativeChain)}>
        <i className="fa-regular fa-shuffle"></i> Switch Network
      </button>
    );
  } else {
    buttons.push(
      <button key="connect-wallet" className="btn-blue" onClick={() => showConnectWalletDialog(nativeChain)}>
        <i className="fa-regular fa-wallet"></i> Connect Wallet
      </button>
    );
  }

  return (
    <Layout module="staking" title="Staking" description="Stake CFN to validator transfers and receive rewards">
      <section className="section-page" style={{ paddingBottom: '100px' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-8 col-md-8 col-lg-4 col-xl-4 mx-auto">
              <div className="validator-info mb-4">
                <img
                  src={`img/avatar/${getValidatorIcon()}.svg`}
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
                          )}`}</div>
                        </div>
                      </div>
                      <div className="col-sm-6 pl-sm-1">
                        <div className="withdrawal-time-block">
                          <div className="title-validator">Withdrawal Time</div>
                          <div className="time-withdrawal">
                            <span>{dayjs.unix(stakingInfo.withdrawalTime.toNumber()).format('L LT')}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {buttons}
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
              <div className="table-block">
                <StakingHeader />
                {validatorsLoading ? (
                  <div>
                    <SkeletonStakingItem />
                    <SkeletonStakingItem />
                    <SkeletonStakingItem />
                    <SkeletonStakingItem />
                    <SkeletonStakingItem />
                  </div>
                ) : (
                  <div>
                    {validators.map((data, i) => {
                      const rank = i + 1;

                      return <StakingItem key={data.validator} rank={rank} data={data} />;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <InputCFNModal
        show={showIncreaseStakeModal}
        decimals={nativeChain.nativeCurrency.decimals}
        maxValue={balance}
        maxValueText="Available to stake"
        title="Increase Stake"
        buttonText="Stake"
        submit={async (amount) => {
          if (nativeContainer === undefined) {
            return;
          }

          const { staking } = nativeContainer;
          setStakingPending(true);
          await (await staking.stake({ value: amount })).wait();
          setStakingPending(false);

          toast(<MsgStakeSuccess />);
        }}
        close={() => setShowIncreaseStakeModal(false)}
      />

      <InputCFNModal
        show={showAnnounceWithdrawalModal}
        decimals={nativeChain.nativeCurrency.decimals}
        maxValue={stakingInfo.stake}
        maxValueText="Available to announce"
        title="Announce Withdrawal"
        buttonText="Announce"
        submit={async (amount) => {
          if (nativeContainer === undefined) {
            return;
          }

          const { staking } = nativeContainer;
          setAnnouncePending(true);
          await (await staking.announceWithdrawal(amount)).wait();
          setAnnouncePending(false);

          toast(<MsgAnnounceSuccess />);
        }}
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
