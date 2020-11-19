import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchPokemonList,
  selectPokemonList,
  selectPokemons,
} from "./pokemonListSlice";

function usePokemonList() {
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const pageFromQuery = query.get("page");
  const page = pageFromQuery ? parseInt(pageFromQuery, 10) : 1;

  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    dispatch(fetchPokemonList(page));
  }, [dispatch, page]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const { result, loading, error } = useSelector(selectPokemonList);
  const pokemons = useSelector(selectPokemons);

  return {
    pokemons,
    page,
    hasPrevious: Boolean(result?.previous),
    hasNext: Boolean(result?.next),
    loading,
    error,
    onRefresh,
  };
}

export default usePokemonList;
