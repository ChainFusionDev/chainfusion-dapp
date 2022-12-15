import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@store/index';
import { setHistory, setHistoryLoading, setHistoryItemsToShow, setOnlyMyHistory } from './reducer';
import { BridgeTransfer } from '@src/types';

export function useBridge() {
  const dispatch = useDispatch();

  return {
    history: useAppSelector(({ bridge }) => bridge.history),
    historyLoading: useAppSelector(({ bridge }) => bridge.historyLoading),
    historyItemsToShow: useAppSelector(({ bridge }) => bridge.historyItemsToShow),
    onlyMyHistory: useAppSelector(({ bridge }) => bridge.onlyMyHistory),

    setHistory: useCallback((history: BridgeTransfer[]) => dispatch(setHistory(history)), []),
    setHistoryLoading: useCallback((historyLoading: boolean) => dispatch(setHistoryLoading(historyLoading)), []),
    setHistoryItemsToShow: useCallback((itemsToShow: number) => dispatch(setHistoryItemsToShow(itemsToShow)), []),
    setOnlyMyHistory: useCallback((onlyMyHistory: boolean) => dispatch(setOnlyMyHistory(onlyMyHistory)), []),
  };
}