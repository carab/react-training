import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const appReducer = {};

export const store = configureStore({ reducer: appReducer });

function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
