import { useState, useEffect } from "react";

function useFetch(url) {
  const [result, setResult] = useState(undefined);
  const [error, setError] = useState(null);
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
            setLoading(false);
            setResult(result);
            setError(null);
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
    [url]
  );

  return [result, loading, error];
}

export default useFetch;
