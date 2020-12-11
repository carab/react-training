import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectPokemonList,
  selectPokemonListChecked,
} from "../PokemonList/pokemonListSlice";

function Navbar() {
  const { result } = useSelector(selectPokemonList);
  const checked = useSelector(selectPokemonListChecked);

  const [size, setSize] = useState<"small" | "medium" | null>(null);

  useEffect(() => {
    const onResize = () => {
      const query = matchMedia("(max-width: 600px)");
      if (query.matches) {
        setSize("small");
      } else {
        setSize("medium");
      }
    };

    onResize();

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const root = (
    <nav>
      <Link to="/">Accueil</Link>{" "}
      <Link to="/pokemon">
        Pokémon {result ? `(${checked.length} / ${result.count})` : null}
      </Link>
    </nav>
  );

  if (size === "small") {
    return root;
  }

  const element = document.querySelector("#side");
  if (size === "medium" && element) {
    return ReactDOM.createPortal(root, element);
  }

  return null;
}

export default Navbar;
