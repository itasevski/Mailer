import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import { ErrorStructure } from "../types/types";

export function useThunk(
  thunk: any
): [(arg: any) => void, boolean, boolean, ErrorStructure | null] {
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(null);

  // arg is optional
  const runThunk = useCallback(
    (arg: any) => {
      setLoading(true);
      dispatch(typeof arg === "undefined" ? thunk() : thunk(arg))
        .unwrap()
        .catch((err: any) => setError(err))
        .finally(() => {
          setLoading(false);
          setFinished(true);
        });
    },
    [dispatch, thunk]
  );

  return [runThunk, loading, finished, error];
}
