import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectPokemonList } from "../PokemonList/pokemonListSlice";

function Navbar() {
  const { result } = useSelector(selectPokemonList);

  return (
    <nav>
      <Link to="/">Accueil</Link>{" "}
      <Link to="/pokemon">Pokémon {result ? `(${result.count})` : null}</Link>
    </nav>
  );
}

export default Navbar;
