import { useEffect, useState } from "react";

export default function useFetch<R>(url: string) {
    const [result, setResult] = useState<R|undefined>(undefined);
    const [error, setError] = useState<Error|null>(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
  
      async function execute() {
        try {
          const response = await fetch(url);
          const result = await response.json();
  
          setResult(result);
          setError(null);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
  
      execute();
    }, [url]);

    return [result, error, loading] as const
}
