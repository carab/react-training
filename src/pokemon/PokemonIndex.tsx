import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PokemonList from "./PokemonList";
import PokemonDetail from "./PokemonDetail";

function PokemonIndex() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <PokemonList />
      </Route>
      <Route path={`${path}/:name`}>
        <PokemonDetail />
      </Route>
    </Switch>
  );
}

export default PokemonIndex;
