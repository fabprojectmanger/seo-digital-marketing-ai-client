import { useCallback, useEffect } from "react";

const useTimeout = (callback, delay, dependencies) => {
  const memoizedCallback = useCallback(callback, [callback, ...dependencies]);

  useEffect(() => {
    const timeout = setTimeout(memoizedCallback, delay);
    return () => clearTimeout(timeout);
  }, [delay, memoizedCallback]);
};


export default useTimeout;
