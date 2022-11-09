import { ValidatorInfo } from '@src/types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@store/index';
import { setValidators } from './reducer';


export function useStaking () {
  const dispatch = useDispatch();

  const validators = useAppSelector(({ staking }) => staking.validators);
  const validatorsLoading = useAppSelector(({ staking }) => staking.validatorsLoading);

  return {
    validators,
    validatorsLoading,

    setValidators: useCallback((validators: ValidatorInfo[]) => dispatch(setValidators(validators)), [])
  };
}
