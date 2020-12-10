import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export type PokemonApiList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

const LIMIT = 20;

function makeUrl(page: number) {
  return `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * LIMIT}&limit=${LIMIT}`;
}

function PokemonList() {
  const [page, setPage] = useState(1);
  const [result, error, loading] = useFetch<PokemonApiList>(makeUrl(page));

  const onNavigate = (diff: number) => {
    setPage((page) => page + diff);
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <button
        disabled={!result?.previous}
        type="button"
        onClick={() => onNavigate(-1)}
      >
        Précédent
      </button>
      <span>Page: {page}</span>
      <button
        disabled={!result?.next}
        type="button"
        onClick={() => onNavigate(1)}
      >
        Suivant
      </button>
      {result ? (
        <ul>
          {result.results.map((pokemon) => (
            <li key={pokemon.name}>
              <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
            </li>
          ))}
        </ul>
      ) : null}
      {loading ? <p>Loading...</p> : null}
    </>
  );
}

export default PokemonList;
