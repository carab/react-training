import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { pokemonListReducer } from "../features/pokemonListSlice";

const persistConfig = {
  key: "app",
  storage,
};

const appReducer = combineReducers({
  pokemonList: pokemonListReducer,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({ reducer: persistedReducer });

export const persistor = persistStore(store);
