import { AnyAction, configureStore } from "@reduxjs/toolkit";
import pokemonListReducer, { PokemonListState } from "../PokemonList/pokemonListSlice";

export type AppStore = {
  pokemonList: PokemonListState;
};

function appReducer(state: Partial<AppStore> = {}, action: AnyAction): AppStore {
  return {
    ...state,
    pokemonList: pokemonListReducer(state.pokemonList, action),
  };
}

const store = configureStore({ reducer: appReducer });

export default store;
