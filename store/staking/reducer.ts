import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StakingInfo, ValidatorInfo } from '@src/types';
import { BigNumber } from 'ethers';

interface StakingState {
  validators: ValidatorInfo[];
  validatorsLoading: boolean;
  stakingInfo: StakingInfo;
  stakingInfoLoading: boolean;
}

export const defaultStakingInfo: StakingInfo = {
  validator: '',
  stake: BigNumber.from(0),
  status: 0,
  withdrawalAmount: BigNumber.from(0),
  withdrawalTime: BigNumber.from(0),
}

const initialState: StakingState = {
  validators: [],
  validatorsLoading: true,
  stakingInfo: defaultStakingInfo,
  stakingInfoLoading: true,
};

const stakingSlice = createSlice({
  name: 'staking',
  initialState,
  reducers: {
    setValidators: (state, action: PayloadAction<ValidatorInfo[]>) => {
      state.validators = action.payload;
      state.validatorsLoading = false;
    },
    setStakingInfo: (state, action: PayloadAction<StakingInfo>) => {
      state.stakingInfo = action.payload;
      state.stakingInfoLoading = false;
    },
    setStakingInfoLoading: (state) => {
      state.stakingInfo = defaultStakingInfo;
      state.stakingInfoLoading = true;
    },
  }
});

export const {
  setValidators,
  setStakingInfo,
  setStakingInfoLoading,
} = stakingSlice.actions;
export default stakingSlice.reducer;
