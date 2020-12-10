import { useEffect, useState } from "react";

function ApiConsumer() {
  const [result, setResult] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function execute() {
      try {
        const response = await fetch("https://api.example.com/items");
        const result = await response.json();

          setLoading(false);
          setResult(result);
          setError(null);
      } catch (error) {
          setLoading(false);
          setError(error);
      }
    }

    execute();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  } else if (result) {
    return <p>{JSON.stringify(result)}</p>;
  } else {
    return null;
  }
}

export default ApiConsumer;
