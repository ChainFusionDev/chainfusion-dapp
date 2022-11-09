import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StakingItemData } from '@src/types';

interface StakingState {
  validators: StakingItemData[];
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
    setValidators: (state, action: PayloadAction<StakingItemData[]>) => {
      state.validators = action.payload;
      state.validatorsLoading = false;
    },
  }
});

export const {
  setValidators,
} = stakingSlice.actions;
export default stakingSlice.reducer;
