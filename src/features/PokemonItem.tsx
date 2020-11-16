import React from "react";
import { Link } from "react-router-dom";
import { PokemonItemModel } from "../service/pokemonApi";

export interface PokemonItemProps {
  baseUrl: string;
  pokemon: PokemonItemModel;
  picked: boolean;
  onTogglePick(): void;
}

function PokemonItem({
  baseUrl,
  pokemon,
  picked,
  onTogglePick,
}: PokemonItemProps) {
  return (
    <li>
      <Link to={`${baseUrl}/${pokemon.name}`}>{pokemon.name}</Link>
      <input type="checkbox" checked={picked} onChange={onTogglePick} />
    </li>
  );
}

export default PokemonItem;
