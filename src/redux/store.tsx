import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import pokemonListReducer, {
  PokemonListState,
} from "../PokemonList/pokemonListSlice";

export type AppStore = {
  pokemonList: PokemonListState;
};

const persistConfig = {
  key: "root",
  storage,
};

function appReducer(
  state: Partial<AppStore> = {},
  action: AnyAction
): AppStore {
  return {
    ...state,
    pokemonList: pokemonListReducer(state.pokemonList, action),
  };
}

const store = configureStore({
  reducer: persistReducer(persistConfig, appReducer),
});

const persistor = persistStore(store);

export { store as default, persistor };
