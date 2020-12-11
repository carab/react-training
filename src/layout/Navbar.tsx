import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectPokemonList,
  selectPokemonListChecked,
} from "../PokemonList/pokemonListSlice";

function Navbar() {
  const { result } = useSelector(selectPokemonList);
  const checked = useSelector(selectPokemonListChecked);

  return (
    <nav>
      <Link to="/">Accueil</Link>{" "}
      <Link to="/pokemon">
        Pokémon {result ? `(${checked.length} / ${result.count})` : null}
      </Link>
    </nav>
  );
}

export default Navbar;
