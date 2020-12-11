import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {
  pokemonListCheck,
  pokemonListSet,
  selectPokemonList,
  selectPokemonListChecked,
} from "./pokemonListSlice";

export type PokemonApiList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

type PokemonApiListItem = PokemonApiList["results"][number];

const LIMIT = 20;

function makeUrl(page: number) {
  return `https://pokeapi.co/api/v2/pokemon?offset=${
    (page - 1) * LIMIT
  }&limit=${LIMIT}`;
}

export function usePokemonList(page: number) {
  const [result, error, loading] = useFetch<PokemonApiList>(makeUrl(page));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pokemonListSet(result, error, loading));
  }, [dispatch, result, error, loading]);

  const pokemonList = useSelector(selectPokemonList);

  return [pokemonList.result, pokemonList.error, pokemonList.loading] as const;
}

export function useQueryPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const page = parseInt(query.get("page") ?? "1");

  return page;
}

function PokemonList() {
  const history = useHistory();
  const page = useQueryPage();
  const dispatch = useDispatch();

  const [result, error, loading] = usePokemonList(page);
  const checked = useSelector(selectPokemonListChecked);

  const onNavigate = (diff: number) => {
    history.push(`?page=${page + diff}`);
  };

  const handleCheck = (pokemon: PokemonApiListItem) => {
    dispatch(pokemonListCheck(pokemon.name));
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
              <input
                type="checkbox"
                checked={checked.includes(pokemon.name)}
                onChange={() => handleCheck(pokemon)}
              />
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
