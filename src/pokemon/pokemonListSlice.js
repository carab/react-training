export function pokemonListRequest(page) {
  return {
    type: "pokemon_list/request",
    payload: {
      page,
    },
  };
}

export function pokemonListReceive(result) {
  return {
    type: "pokemon_list/receive",
    payload: {
      result,
    },
  };
}

export function pokemonListError(error) {
  return {
    type: "pokemon_list/error",
    payload: {
      error,
    },
  };
}

export function togglePick(name) {
  return {
    type: "pokemon_list/toggle_pick",
    payload: {
      name,
    },
  };
}

const BASE_URL = "https://pokeapi.co/api/v2";
const LIMIT = 20;

function makeUrl(page) {
  const url = `${BASE_URL}/pokemon?offset=${(page - 1) * LIMIT}&limit=${LIMIT}`;

  return url;
}

let CURRENT_ABORT_CONTROLLER;

async function execute(page) {
  if (CURRENT_ABORT_CONTROLLER) {
    CURRENT_ABORT_CONTROLLER.abort();
  }

  CURRENT_ABORT_CONTROLLER = new AbortController();

  try {
    const response = await fetch(makeUrl(page), {
      signal: CURRENT_ABORT_CONTROLLER.signal,
    });

    const result = await response.json();

    return result;
  } catch (error) {
    if (error.name === "AbortError") {
      return undefined;
    } else {
      throw error;
    }
  }
}

/**
 * Thunk creator to fetch Pokemon list
 * @param {number} page
 */
export function fetchPokemonList(page) {
  return async function fetchPokemonListThunk(dispatch) {
    dispatch(pokemonListRequest(page));

    try {
      const result = await execute(page);
      dispatch(pokemonListReceive(result));
    } catch (error) {
      dispatch(pokemonListError(error));
    }
  };
}

export const initialState = {
  page: null,
  result: null,
  loading: false,
  error: null,
  picked: [],
};

export function pokemonListReducer(state = initialState, action) {
  switch (action.type) {
    case "pokemon_list/request": {
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    }

    case "pokemon_list/receive": {
      return {
        ...state,
        result: action.payload.result,
        loading: false,
        error: null,
      };
    }

    case "pokemon_list/error": {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
        result: null,
      };
    }

    case "pokemon_list/toggle_pick": {
      const picked = [...state.picked];
      const index = picked.findIndex((name) => {
        return name === action.payload.name;
      });

      if (index >= 0) {
        picked.splice(index, 1);
      } else {
        picked.push(action.payload.name);
      }

      return {
        ...state,
        picked,
      };
    }

    default:
      return state;
  }
}

export function selectPokemonList(state) {
  return state.pokemonList;
}

export function selectPicked(state) {
  return state.pokemonList.picked;
}

export function selectPokemons(state) {
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
