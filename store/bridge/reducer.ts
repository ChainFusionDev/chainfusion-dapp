import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';

export interface EventRegistered {
  _hash: string;
  _appContract: string;
  _sourceChain: BigNumber;
  _destinationChain: BigNumber;
  _data: string;
  _validatorFee: BigNumber;
  _eventType: number;
}

interface BridgeState {
  history: EventRegistered[];
  historyLoading: boolean;
  onlyMyHistory: boolean;
}

const initialState: BridgeState = {
  history: [],
  historyLoading: true,
  onlyMyHistory: false,
};

const bridgeSlice = createSlice({
  name: 'bridge',
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<EventRegistered[]>) => {
      state.history = action.payload;
      state.historyLoading = false;
    },
    setOnlyMyHistory: (state, action: PayloadAction<boolean>) => {
      state.onlyMyHistory = action.payload;
    },
  }
});

export const {
  setHistory,
  setOnlyMyHistory
} = bridgeSlice.actions;
export default bridgeSlice.reducer;
