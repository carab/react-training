import { AnyAction } from "@reduxjs/toolkit";
import { AppStore } from "../redux/store";
import { PokemonApiList } from "./PokemonList";

export function pokemonListSet(
  result: PokemonApiList | undefined,
  error: Error | null,
  loading: boolean
) {
  return {
    type: "pokemonList/set",
    payload: {
      result,
      error,
      loading,
    },
  };
}

export type PokemonListState = {
  result: PokemonApiList | undefined;
  error: Error | null;
  loading: boolean;
};

const initialState: PokemonListState = {
  result: undefined,
  error: null,
  loading: false,
};

export default function pokemonListReducer(
  state: PokemonListState = initialState,
  action: AnyAction
): PokemonListState {
  switch (action.type) {
    case "pokemonList/set": {
      return {
        ...state,
        result: action.payload.result ?? state.result,
        error: action.payload.error,
        loading: action.payload.loading,
      };
    }
    default:
      return state;
  }
}

export function selectPokemonList(state: AppStore) {
  return state.pokemonList;
}
