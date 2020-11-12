import { Route, Switch, useRouteMatch } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";
import PokemonList from "../features/PokemonList";

function PokemonIndex() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/`}>
        <PokemonList />
      </Route>
      <Route path={`${path}/:slug`}>
        <PokemonDetail />
      </Route>
    </Switch>
  );
}

export default PokemonIndex;
