import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import ErrorNotFound from "./components/ErrorNotFound";
import Home from "./components/Home";
import PokemonIndex from "./components/PokemonIndex";

function App() {
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
