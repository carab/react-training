import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import ErrorNotFound from "./components/ErrorNotFound";
import Home from "./components/Home";
import PokemonList from "./components/PokemonList";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/pokemon">Pokémon</Link>
        </nav>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pokemon">
            <PokemonList />
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
