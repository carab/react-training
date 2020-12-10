import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import PokemonIndex from './PokemonList/PokemonIndex';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="/">Accueil</Link>
          {' '}
          <Link to="/pokemon">Pokémon</Link>
        </nav>

        <Switch>
          <Route exact path="/">
            <h1>Bonjour</h1>
          </Route>

          <Route path="/pokemon">
            <PokemonIndex/>
          </Route>

          <Route>
            <h1>Erreur 404</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
