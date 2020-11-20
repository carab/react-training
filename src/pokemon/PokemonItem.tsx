import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { togglePick } from "./pokemonListSlice";

export type PokemonItemModel = {
  name: string;
  picked: boolean;
}

export type PokemonItemProps = {
  baseUrl: string;
  pokemon: PokemonItemModel;
}

function PokemonItem({ baseUrl, pokemon }: PokemonItemProps) {
  const dispatch = useDispatch();

  function onTogglePick() {
    dispatch(togglePick(pokemon.name));
  }

  return (
    <li>
      <input type="checkbox" checked={pokemon.picked} onChange={onTogglePick} />
      <Link to={`${baseUrl}/${pokemon.name}`}>{pokemon.name}</Link>
    </li>
  );
}

export default PokemonItem;
