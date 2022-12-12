import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@store/index';
import { EventRegistered, setHistory } from './reducer';


export function useBridge () {
  const dispatch = useDispatch();

  return {
    history: useAppSelector(({ bridge }) => bridge.history),
    historyLoading: useAppSelector(({ bridge }) => bridge.historyLoading),

    setHistory: useCallback((validators: EventRegistered[]) => dispatch(setHistory(validators)), []),
  };
}
