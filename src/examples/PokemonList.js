import { useEffect, useState } from "react";

function ApiConsumer() {
    const [result, setResult] = useState(undefined);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('https://pokeapi.co/api/v2/pokemon')
        .then(response => response.json())
        .then(
            result => {
            setLoading(false);
            setResult(result);
            setError(null);
            },
            error => {
            setLoading(false);
            setError(error);
            },
        );
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else if (result) {
        return <ul>{JSON.stringify(result)}</ul>;
    } else {
        return null;
    }
}

export default ApiConsumer