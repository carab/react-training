import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import PokemonItem from "./PokemonItem";
import {
  pokemonListFetch,
  pokemonListTogglePick,
  selectPokemonList,
  selectPokemonListPicked,
} from "./pokemonListSlice";

function PokemonList() {
  const dispatch = useDispatch();
  const { result, error, loading } = useSelector(selectPokemonList);
  const pickedPokemons = useSelector(selectPokemonListPicked);
  const { url } = useRouteMatch();
  const query = useQuery();
  const page = parseInt(query.get("page") ?? "1", 10);

  useEffect(() => {
    dispatch(pokemonListFetch(page));
  }, [dispatch, page]);

  function isPicked(name: string) {
    return pickedPokemons.includes(name);
  }

  function handleTogglePick(name: string) {
    return () => dispatch(pokemonListTogglePick(name));
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1>Liste des Pokémon</h1>
      {result ? (
        <div>
          <nav>
            {result.previous ? (
              <Link to={`${url}?page=${page - 1}`}>Précédent</Link>
            ) : (
              <span>Précédent</span>
            )}
            {result.next ? (
              <Link to={`${url}?page=${page + 1}`}>Suivant</Link>
            ) : (
              <span>Suivant</span>
            )}
          </nav>
          <ul>
            {result.results.map(pokemon => (
              <PokemonItem
                key={pokemon.name}
                pokemon={pokemon}
                baseUrl={url}
                picked={isPicked(pokemon.name)}
                onTogglePick={handleTogglePick(pokemon.name)}
              />
            ))}
          </ul>
        </div>
      ) : null}
      {loading ? <p>Loading...</p> : null}
    </>
  );
}

export default PokemonList;
