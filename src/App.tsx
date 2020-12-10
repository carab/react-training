import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PokemonIndex from "./PokemonList/PokemonIndex";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <h1>Bonjour</h1>
            </Route>

            <Route path="/pokemon">
              <PokemonIndex />
            </Route>

            <Route>
              <h1>Erreur 404</h1>
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
