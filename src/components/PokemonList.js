import { useState } from "react";
import useFetch from "../hooks/useFetch";

const ENDPOINT = "https://pokeapi.co/api/v2/pokemon";
const LIMIT = 20;

function makeUrl(page) {
  return `${ENDPOINT}?offset=${(page - 1) * LIMIT}&limit=${LIMIT}`;
}

function PokemonList() {
  const [page, setPage] = useState(1);
  const [result, loading, error] = useFetch(makeUrl(page));

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1>Liste des Pokémon</h1>
      {result ? (
        <div>
          <button
            onClick={() => setPage((page) => page - 1)}
            disabled={!result.previous}
          >
            Précédent
          </button>
          <button
            onClick={() => setPage((page) => page + 1)}
            disabled={!result.next}
          >
            Suivant
          </button>
          <ul>
            {result.results.map((pokemon) => (
              <li key={pokemon.name}>{pokemon.name}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {loading ? <p>Loading...</p> : null}
    </>
  );
}

export default PokemonList;
