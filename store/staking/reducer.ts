import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValidatorInfo } from '@src/types';

interface StakingState {
  validators: ValidatorInfo[];
  validatorsLoading: boolean;
}

const initialState: StakingState = {
  validators: [],
  validatorsLoading: true,
};

const stakingSlice = createSlice({
  name: 'staking',
  initialState,
  reducers: {
    setValidators: (state, action: PayloadAction<ValidatorInfo[]>) => {
      state.validators = action.payload;
      state.validatorsLoading = false;
    },
  }
});

export const {
  setValidators,
} = stakingSlice.actions;
export default stakingSlice.reducer;
