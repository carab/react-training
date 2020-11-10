import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const ENDPOINT = "https://pokeapi.co/api/v2";

function makeUrl(slug) {
  return `${ENDPOINT}/pokemon/${slug}`;
}

function PokemonDetail() {
  const params = useParams();
  const [result, loading, error] = useFetch(makeUrl(params.slug));

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {result ? (
        <>
          <h1>{result.name}</h1>
          <dl>
            <dt>Types</dt>
            <dd>{result.types.map((type) => type.type.name).join(" | ")}</dd>
            <dt>Sprite</dt>
            <dd>
              <img src={result.sprites.front_default} alt={result.name} />
            </dd>
          </dl>
        </>
      ) : null}
      {loading ? <p>Loading...</p> : null}
    </>
  );
}

export default PokemonDetail;
