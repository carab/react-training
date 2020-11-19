import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "../todo/todoSlice";

const appReducer = {
  todo: todoReducer,
};

const store = configureStore({ reducer: appReducer });

export default store;
