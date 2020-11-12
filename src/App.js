import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import ErrorNotFound from "./components/ErrorNotFound";
import Home from "./components/Home";
import PokemonIndex from "./components/PokemonIndex";
import { selectPokemonListPicked } from "./features/pokemonListSlice";

function App() {
  const pickedPokemons = useSelector(selectPokemonListPicked);

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Route exact path="/">
            {({ match }) => (
              <Link to="/" aria-current={match ? "page" : undefined}>
                Home
              </Link>
            )}
          </Route>
          <Route path="/pokemon">
            {({ match }) => (
              <Link to="/pokemon" aria-current={match ? "page" : undefined}>
                Pokémon
                {pickedPokemons.length ? `(${pickedPokemons.length})` : null}
              </Link>
            )}
          </Route>
        </nav>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pokemon">
            <PokemonIndex />
          </Route>
          <Route>
            <ErrorNotFound />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
