import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PokemonIndex from "./pokemon/PokemonIndex";
import { Provider as StoreProvider } from "react-redux";
import TodoList from "./todo/TodoList";
import store from "./redux/store";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pokemon">
            <PokemonIndex />
          </Route>
          <Route path="/todo">
            <TodoList />
          </Route>
          <Route>
            <ErrorNotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </StoreProvider>
  );
}

function Home() {
  return <p>Page d'accueil</p>;
}

function ErrorNotFound() {
  return <p>Erreur 404</p>;
}

export default App;
