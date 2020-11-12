export function pokemonListSet(result, loading, error) {
  return {
    type: "pokemon_list/set",
    result,
    loading,
    error,
  };
}

const initialState = {
  result: undefined,
  loading: false,
  error: null,
}

export function pokemonListReducer(state = initialState, action) {
  switch (action.type) {
    case "pokemon_list/set":
      return {
        ...state,
        result: action.result,
        loading: action.loading,
        error: action.error,
      };
    default:
      return state;
  }
}

export function selectPokemonList(state) {
  return state.pokemonList;
}
