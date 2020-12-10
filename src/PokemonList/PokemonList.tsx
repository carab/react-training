import useFetch from "../hooks/useFetch";

export type PokemonApiList = {
  count: number;
  next: string|null;
  previous: string|null;
  results: Array<{
    name: string;
    url: string;
  }>
}

function PokemonList() {
  const [result, error, loading] = useFetch<PokemonApiList>('https://pokeapi.co/api/v2/pokemon')

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (result) {
    const { results } = result;

    return (
      <ul>
        {results.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    );
  }

  return null;
}

export default PokemonList;
