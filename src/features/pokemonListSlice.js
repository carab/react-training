export function pokemonListSet(result, loading, error) {
  return {
    type: "pokemon_list/set",
    result,
    loading,
    error,
  };
}

export function pokemonListTogglePick(name) {
  return {
    type: "pokemon_list/toggle_pick",
    name,
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
    case "pokemon_list/set":
      return {
        ...state,
        result: action.result,
        loading: action.loading,
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
