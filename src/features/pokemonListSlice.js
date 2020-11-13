import { getPokemonList } from "../service/pokemonApi";

export function pokemonListTogglePick(name) {
  return {
    type: "pokemon_list/toggle_pick",
    name,
  };
}

export function pokemonListRequest(page) {
  return {
    type: "pokemon_list/request",
    page,
  };
}

export function pokemonListReceive(result) {
  return {
    type: "pokemon_list/receive",
    result,
  };
}

export function pokemonListError(error) {
  return {
    type: "pokemon_list/error",
    error,
  };
}

export function pokemonListFetch(page) {
  return async (dispatch, getState) => {
    dispatch(pokemonListRequest(page));

    try {
      const result = await getPokemonList(page);

      dispatch(pokemonListReceive(result));
    } catch (error) {
      if (error.name !== "AbortError") {
        dispatch(pokemonListError(error));
      }
    }
  };
}

const initialState = {
  result: undefined,
  loading: false,
  error: null,
  picked: [],
};

export function pokemonListReducer(state = initialState, action) {
  switch (action.type) {
    case "pokemon_list/request":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "pokemon_list/receive":
      return {
        ...state,
        result: action.result,
        loading: false,
      };
    case "pokemon_list/error":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "pokemon_list/toggle_pick":
      const picked = [...state.picked];
      const index = state.picked.findIndex((name) => name === action.name);

      if (index >= 0) {
        picked.splice(index, 1);
      } else {
        picked.push(action.name);
      }

      return {
        ...state,
        picked,
      };
    default:
      return state;
  }
}

export function selectPokemonList(state) {
  return state.pokemonList;
}

export function selectPokemonListPicked(state) {
  return state.pokemonList.picked;
}
