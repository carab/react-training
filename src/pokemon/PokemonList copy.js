import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import PokemonItem from "./PokemonItem";
import { fetchPokemonList, selectPokemonList } from "./pokemonListSlice";

function selectPicked(state) {
  return state.pokemonList.picked;
}

function selectPokemons(state) {
  const picked = selectPicked(state);
  const result = state.pokemonList.result;

  if (!result) {
    return null;
  }

  const pokemons = result.results.map((pokemon) => {
    return {
      ...pokemon,
      picked: picked.includes(pokemon.name),
    };
  });

  return pokemons;
}

function PokemonList() {
  const history = useHistory();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const pageFromQuery = query.get("page");
  const page = pageFromQuery ? parseInt(pageFromQuery, 10) : 1;

  const { url } = useRouteMatch();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemonList(page));
  }, [dispatch, page]);

  const {result, loading, error} = useSelector(selectPokemonList);
  const pokemons = useSelector(selectPokemons);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {result ? (
        <p>
          <button
            type="button"
            disabled={null === result.previous}
            onClick={onPrevious}
          >
            Précédent
          </button>
          Page: {page}
          <button
            type="button"
            disabled={null === result.next}
            onClick={onNext}
          >
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
