import { useState, useEffect } from "react";

function useFetch<R>(url: string, isResult?: (value: any) => value is R) {
  const [result, setResult] = useState<R|undefined>(undefined);
  const [error, setError] = useState<Error|null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(
    function fetchEffect() {
      setLoading(true);

      const controller = new AbortController();

      fetch(url, {
        signal: controller.signal,
      })
        .then((response) => response.json())
        .then(
          (result) => {
            if (!isResult || isResult(result)) {
              setLoading(false);
              setResult(result);
              setError(null);
            } else {
              throw new Error('Result is not of the expected type.')
            }
          },
          (error) => {
            setLoading(false);
            if (error.name !== "AbortError") {
              setError(error);
            }
          }
        );

      return function fetchEffectCleanup() {
        controller.abort();
      };
    },
    [url, isResult]
  );

  return [result, loading, error] as const;
}

export default useFetch;
