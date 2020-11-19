import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { togglePick } from "./pokemonListSlice";

function PokemonItem({ baseUrl, pokemon }) {
  const dispatch = useDispatch();

  function onTogglePick() {
    dispatch(togglePick(pokemon.name));
  }

  return (
    <li>
      <input type="checkbox" value={pokemon.picked} onChange={onTogglePick} />
      <Link to={`${baseUrl}/${pokemon.name}`}>{pokemon.name}</Link>
    </li>
  );
}

export default PokemonItem;
