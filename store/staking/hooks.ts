import { StakingInfo, ValidatorInfo } from '@src/types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@store/index';
import { setValidators, setStakingInfo, setStakingInfoLoading } from './reducer';


export function useStaking () {
  const dispatch = useDispatch();

  return {
    validators: useAppSelector(({ staking }) => staking.validators),
    validatorsLoading: useAppSelector(({ staking }) => staking.validatorsLoading),
    stakingInfo: useAppSelector(({ staking }) => staking.stakingInfo),
    stakingInfoLoading: useAppSelector(({ staking }) => staking.stakingInfoLoading),

    setValidators: useCallback((validators: ValidatorInfo[]) => dispatch(setValidators(validators)), []),
    setStakingInfo: useCallback((stakingInfo: StakingInfo) => dispatch(setStakingInfo(stakingInfo)), []),
    setStakingInfoLoading: useCallback(() => dispatch(setStakingInfoLoading()), []),
  };
}
