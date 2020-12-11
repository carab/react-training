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

export function pokemonListCheck(name: string) {
  return {
    type: "pokemonList/check",
    payload: {
      name,
    },
  };
}

export type PokemonListState = {
  result: PokemonApiList | undefined;
  error: Error | null;
  loading: boolean;
  checked: string[];
};

const initialState: PokemonListState = {
  result: undefined,
  error: null,
  loading: false,
  checked: [],
};

function checkReducer(
  state: PokemonListState = initialState,
  action: ReturnType<typeof pokemonListCheck>
) {
  const checked = [...state.checked];
  const index = checked.indexOf(action.payload.name);

  if (index >= 0) {
    checked.splice(index, 1);
  } else {
    checked.push(action.payload.name);
  }

  return {
    ...state,
    checked,
  };
}

export default function pokemonListReducer(
  state: PokemonListState = initialState,
  action: AnyAction
): PokemonListState {
  switch (action.type) {
    case "pokemonList/check": {
      return checkReducer(state, action as any);
    }
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

export function selectPokemonList(state: AppStore): PokemonListState {
  return state.pokemonList;
}

export function selectPokemonListChecked(
  state: AppStore
): PokemonListState["checked"] {
  return selectPokemonList(state).checked;
}
