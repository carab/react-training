import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { AppStore } from "../redux/store";
import pokemonListService from "./pokemonListService";
import produce from "immer";

export type PokemonApiList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export function isPokemonApiList(subject: any): subject is PokemonApiList {
  return null !== subject && typeof subject === "object";
}

export type PokemonApiListItem = PokemonApiList["results"][number];

export function pokemonListRequest(page: number) {
  return {
    type: "pokemonList/request",
    payload: {
      page,
    },
  };
}

export function pokemonListReceive(result: PokemonApiList) {
  return {
    type: "pokemonList/receive",
    payload: {
      result,
    },
  };
}

export function pokemonListError(error: Error) {
  return {
    type: "pokemonList/error",
    payload: {
      error,
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

export function fetchPokemonList(page: number) {
  return async (dispatch: Dispatch) => {
    dispatch(pokemonListRequest(page));

    try {
      const result = await pokemonListService.get(page);
      dispatch(pokemonListReceive(result));
    } catch (error) {
      if (error.name !== "AbortError") {
        dispatch(pokemonListError(error));
      }
    }
  };
}

export type PokemonListState = {
  result: PokemonApiList | undefined;
  error: Error | null;
  loading: boolean;
  checked: string[];
  page: number | undefined;
};

const initialState: PokemonListState = {
  result: undefined,
  error: null,
  loading: false,
  checked: [],
  page: undefined,
};

function checkReducer(
  state: PokemonListState,
  action: ReturnType<typeof pokemonListCheck>
) {
  const index = state.checked.indexOf(action.payload.name);

  if (index >= 0) {
    state.checked.splice(index, 1);
  } else {
    state.checked.push(action.payload.name);
  }
}

const reducers = {
  "pokemonList/check": produce(checkReducer),
  "pokemonList/request": produce(
    (
      state: PokemonListState,
      action: ReturnType<typeof pokemonListRequest>
    ) => {
      state.page = action.payload.page;
      state.loading = true;
    }
  ),
  "pokemonList/receive": produce(
    (
      state: PokemonListState,
      action: ReturnType<typeof pokemonListReceive>
    ) => {
      state.result = action.payload.result;
      state.error = null;
      state.loading = false;
    }
  ),
  "pokemonList/error": produce(
    (state: PokemonListState, action: ReturnType<typeof pokemonListError>) => {
      state.error = action.payload.error;
      state.loading = false;
    }
  ),
};

export default function pokemonListReducer(
  state: PokemonListState = initialState,
  action: AnyAction
): PokemonListState {
  const reducer = reducers[action.type as keyof typeof reducers];

  if (reducer) {
    return reducer(state, action as any);
  }

  return state;
}

export function selectPokemonList(state: AppStore): PokemonListState {
  return state.pokemonList;
}

export function selectPokemonListChecked(
  state: AppStore
): PokemonListState["checked"] {
  return selectPokemonList(state).checked;
}
