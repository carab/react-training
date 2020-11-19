import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import PokemonItem from "./PokemonItem";
import usePokemonList from "./usePokemonList";

function PokemonList() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const {
    pokemons,
    page,
    hasNext,
    hasPrevious,
    loading,
    error,
    onRefresh,
  } = usePokemonList();

  if (error) {
    return (
      <div>
        Error: {error.message}
        <button type="button" onClick={onRefresh}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {page ? (
        <p>
          <button type="button" disabled={!hasPrevious} onClick={onPrevious}>
            Précédent
          </button>
          Page: {page}
          <button type="button" disabled={!hasNext} onClick={onNext}>
            Suivant
          </button>
        </p>
      ) : null}
      {pokemons ? (
        <ul>
          {pokemons.map((pokemon) => (
            <PokemonItem key={pokemon.name} pokemon={pokemon} baseUrl={url} />
          ))}
        </ul>
      ) : null}
      {loading ? <p>Loading...</p> : null}
    </>
  );

  function onPrevious() {
    history.push(`${url}?page=${page - 1}`);
  }

  function onNext() {
    history.push(`${url}?page=${page + 1}`);
  }
}

export default PokemonList;
