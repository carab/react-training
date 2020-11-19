export function pokemonListSet(result, loading, error) {
  return {
    type: "pokemon_list/set",
    payload: {
      result,
      loading,
      error,
    },
  };
}

export const initialState = {
  result: null,
  loading: false,
  error: null,
};

export function pokemonListReducer(state = initialState, action) {
  switch (action.type) {
    case "pokemon_list/set": {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}
