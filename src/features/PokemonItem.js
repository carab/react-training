import { Link } from "react-router-dom";

function PokemonItem({ baseUrl, pokemon, picked, onTogglePick }) {
  return (
    <li>
      <Link to={`${baseUrl}/${pokemon.name}`}>{pokemon.name}</Link>
      <input type="checkbox" checked={picked} onChange={onTogglePick} />
    </li>
  );
}

export default PokemonItem;
