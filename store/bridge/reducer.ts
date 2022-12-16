import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BridgeTransfer } from '@src/types';
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
  receiver: string | undefined;
  history: BridgeTransfer[];
  historyLoading: boolean;
  historyItemsToShow: number;
  onlyMyHistory: boolean;
}

const initialState: BridgeState = {
  receiver: undefined,
  history: [],
  historyLoading: true,
  historyItemsToShow: 5,
  onlyMyHistory: false,
};

const bridgeSlice = createSlice({
  name: 'bridge',
  initialState,
  reducers: {
    setReceiver: (state, actions: PayloadAction<string | undefined>) => {
      state.receiver = actions.payload;
    },
    setHistory: (state, action: PayloadAction<BridgeTransfer[]>) => {
      state.history = action.payload;
    },
    setHistoryLoading: (state, action: PayloadAction<boolean>) => {
      state.historyLoading = action.payload;
      if (action.payload) {
        state.historyItemsToShow = initialState.historyItemsToShow;
      }
    },
    setHistoryItemsToShow: (state, actions: PayloadAction<number>) => {
      state.historyItemsToShow = actions.payload;
    },
    setOnlyMyHistory: (state, action: PayloadAction<boolean>) => {
      state.onlyMyHistory = action.payload;
    },
  }
});

export const {
  setReceiver,
  setHistory,
  setHistoryLoading,
  setHistoryItemsToShow,
  setOnlyMyHistory
} = bridgeSlice.actions;
export default bridgeSlice.reducer;
