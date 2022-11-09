import { StakingInfo, ValidatorInfo } from '@src/types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@store/index';
import { setValidators, setStakingInfo, setStakingInfoLoading } from './reducer';


export function useStaking () {
  const dispatch = useDispatch();

  const validators = useAppSelector(({ staking }) => staking.validators);
  const validatorsLoading = useAppSelector(({ staking }) => staking.validatorsLoading);
  const stakingInfo = useAppSelector(({ staking }) => staking.stakingInfo);
  const stakingInfoLoading = useAppSelector(({ staking }) => staking.stakingInfoLoading);

  return {
    validators,
    validatorsLoading,
    stakingInfo,
    stakingInfoLoading,

    setValidators: useCallback((validators: ValidatorInfo[]) => dispatch(setValidators(validators)), []),
    setStakingInfo: useCallback((stakingInfo: StakingInfo) => dispatch(setStakingInfo(stakingInfo)), []),
    setStakingInfoLoading: useCallback(() => dispatch(setStakingInfoLoading()), []),
  };
}
