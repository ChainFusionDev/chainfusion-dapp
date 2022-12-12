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
}

const initialState: BridgeState = {
  history: [],
  historyLoading: true,
};

const bridgeSlice = createSlice({
  name: 'bridge',
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<EventRegistered[]>) => {
      state.history = action.payload;
      state.historyLoading = false;
    },
  }
});

export const {
  setHistory,
} = bridgeSlice.actions;
export default bridgeSlice.reducer;
