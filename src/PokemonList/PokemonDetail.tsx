import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

type PokemonApiDetail = {
  name: string;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: Array<{
    slot: string;
    type: { name: string };
  }>;
};

function makeUrl(name: string) {
  return `https://pokeapi.co/api/v2/pokemon/${name}`;
}

function PokemonDetail() {
  const { name } = useParams<{ name: string }>();
  const [result, error, loading] = useFetch<PokemonApiDetail>(makeUrl(name));

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (result) {
    return (
      <div>
        <h1>{result.name}</h1>
        <dl>
          <dt>Sprite</dt>
          <dd>
            <img src={result.sprites.front_default} alt={result.name} />
          </dd>

          <dt>Poids</dt>
          <dd>{result.weight}</dd>

          <dt>Types</dt>
          <dd>
            {result.types.map((type) => (
              <p key={type.slot}>{type.type.name}</p>
            ))}
          </dd>
        </dl>
      </div>
    );
  }

  return null;
}

export default PokemonDetail;
