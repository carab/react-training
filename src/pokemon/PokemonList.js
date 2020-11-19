import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { pokemonListSet } from "./pokemonListSlice";

const BASE_URL = "https://pokeapi.co/api/v2";
const LIMIT = 20;

function makeUrl(page) {
  const url = `${BASE_URL}/pokemon?offset=${(page - 1) * LIMIT}&limit=${LIMIT}`;

  return url;
}

function PokemonList() {
  const history = useHistory()
  const location = useLocation()

  const query = new URLSearchParams(location.search)
  const pageFromQuery = query.get('page')
  const page = pageFromQuery ? parseInt(pageFromQuery, 10) : 1;

  const { url } = useRouteMatch();
  const [result, loading, error] = useFetch(makeUrl(page));

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pokemonListSet(result, loading, error))
  }, [dispatch, result, loading, error])

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
      {result ? <ul>{result.results.map(mapPokemon)}</ul> : null}
      {loading ? <p>Loading...</p> : null}
    </>
  );

  function onPrevious() {
    history.push(`${url}?page=${page - 1}`)
  }

  function onNext() {
    history.push(`${url}?page=${page + 1}`)
  }

  function mapPokemon(pokemon) {
    return (
      <li key={pokemon.name}>
        <Link to={`${url}/${pokemon.name}`}>{pokemon.name}</Link>
      </li>
    );
  }
}

export default PokemonList;
