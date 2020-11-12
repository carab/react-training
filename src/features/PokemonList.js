import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useQuery from "../hooks/useQuery";
import { pokemonListSet, selectPokemonList } from "./pokemonListSlice";

const ENDPOINT = "https://pokeapi.co/api/v2";
const LIMIT = 20;

function makeUrl(page) {
  return `${ENDPOINT}/pokemon?offset=${(page - 1) * LIMIT}&limit=${LIMIT}`;
}

function PokemonList() {
  const dispatch = useDispatch();
  const { result, error, loading } = useSelector(selectPokemonList);
  const { url } = useRouteMatch();
  const query = useQuery();
  const page = parseInt(query.get("page") ?? 1, 10);
  const fetchState = useFetch(makeUrl(page));

  useEffect(() => {
    dispatch(
      pokemonListSet(fetchState.result, fetchState.loading, fetchState.error)
    );
  }, [dispatch, fetchState.result, fetchState.loading, fetchState.error]);

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
            {result.results.map((pokemon) => (
              <li key={pokemon.name}>
                <Link to={`${url}/${pokemon.name}`}>{pokemon.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {loading ? <p>Loading...</p> : null}
    </>
  );
}

export default PokemonList;
