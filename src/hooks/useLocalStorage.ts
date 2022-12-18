import { useDebugValue, useEffect, useState } from 'react';

export const useLocalStorage = <S>(
  key: string,
  initialState?: S | (() => S)
): [S | undefined, React.Dispatch<React.SetStateAction<S>>] => {
  const [state, setState] = useState<S>(initialState as S);
  useDebugValue(state);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) setState(parse(item));
  }, []);

  return [state, setState];
};

const parse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};
