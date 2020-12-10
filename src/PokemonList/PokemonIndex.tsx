import { Route, Switch, useRouteMatch } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";
import PokemonList from "./PokemonList";

function PokemonIndex() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:name`}>
        <PokemonDetail />
      </Route>
      <Route path={path}>
        <PokemonList />
      </Route>
    </Switch>
  );
}

export default PokemonIndex;
