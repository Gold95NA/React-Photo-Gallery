import { useCallback, useEffect, useRef, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

type State<T> = { data: T | null; loading: boolean; error: string | null };

export function useFetch<T>(
  makeRequest: () => Promise<AxiosResponse<any>>,
  deps: any[] = []
) {
  const [state, setState] = useState<State<T>>({
    data: null,
    loading: true,
    error: null,
  });
  const mounted = useRef(true);

  const run = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await makeRequest();
      if (!mounted.current) return;
      setState({ data: res.data as T, loading: false, error: null });
    } catch (e: any) {
      if (!mounted.current) return;
      setState({ data: null, loading: false, error: e?.message ?? 'Error' });
    }
  }, deps);

  useEffect(() => {
    mounted.current = true;
    run();
    return () => {
      mounted.current = false;
    };
  }, deps); 

  const refetch = useCallback(() => run(), [run]);

  return { ...state, refetch };
}