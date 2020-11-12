import { useEffect, useMemo, useState } from "react";

function useFetch(url) {
  const [result, setResult] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
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

    return () => {
      controller.abort();
    };
  }, [url]);

  return useMemo(() => {
    const _return = [result, loading, error];

    _return.result = result;
    _return.loading = loading;
    _return.error = error;

    return _return;
  }, [result, loading, error]);
}

export default useFetch;
