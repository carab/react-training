import { useEffect, useState } from "react";

type FetchValidator<R> = (result: any) => result is R;

export default function useFetch<R>(url: string, validator: FetchValidator<R>) {
  const [result, setResult] = useState<R | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(
    function startRequest() {
      setLoading(true);

      const controller = new AbortController();
      const { signal } = controller;

      async function execute() {
        try {
          const response = await fetch(url, {
            signal,
          });
          const result = await response.json();

          if (validator(result)) {
            setResult(result);
            setError(null);
          } else {
            throw new TypeError("API result is not of expected type");
          }
        } catch (error) {
          if (error.name !== "AbortError") {
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
    },
    [url, validator]
  );

  return [result, error, loading] as const;
}
