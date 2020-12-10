import { useEffect, useState } from "react";

export default function useFetch<R>(url: string) {
  const [result, setResult] = useState<R | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(function startRequest() {
    setLoading(true);

    const controller = new AbortController();
    const { signal } = controller;

    async function execute() {
      try {
        const response = await fetch(url, {
          signal
        });
        const result = await response.json();

        setResult(result);
        setError(null);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    }

    execute();

    return function cancelRequest() {
      controller.abort();
    };
  }, [url]);

  return [result, error, loading] as const;
}
