import { configureStore } from "@reduxjs/toolkit";
import { pokemonListReducer } from "../pokemon/pokemonListSlice";
import { todoReducer } from "../todo/todoSlice";

const appReducer = {
  todo: todoReducer,
  pokemonList: pokemonListReducer
};

const store = configureStore({
  reducer: appReducer
});

export default store;
