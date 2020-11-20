import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { pokemonListReducer } from "../pokemon/pokemonListSlice";
import { todoReducer } from "../todo/todoSlice";

const persistConfig = {
  key: 'PokemonApp',
  storage,
}


const appReducer = combineReducers({
  todo: todoReducer,
  pokemonList: pokemonListReducer
});

const store = configureStore({
  reducer: persistReducer(persistConfig, appReducer)
});

export default store;

export const persistor = persistStore(store)
