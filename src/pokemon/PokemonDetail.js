import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const BASE_URL = "https://pokeapi.co/api/v2";

function makeUrl(name) {
  const url = `${BASE_URL}/pokemon/${name}`;

  return url;
}

function PokemonDetail() {
  const { name } = useParams();

  const [result, loading, error] = useFetch(makeUrl(name));

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading || !result) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{result.name}</h1>
      <dl>
        <dt>Poids</dt>
        <dd>{result.weight}</dd>
      </dl>
      <dl>
        <dt>Types</dt>
        {result.types.map((type) => (
          <dd key={type.type.name}>{type.type.name}</dd>
        ))}
      </dl>
      <dl>
        <dt>Sprite</dt>
        <dd>
          <img src={result.sprites.front_default} alt={result.name} />
        </dd>
      </dl>
    </div>
  );
}

export default PokemonDetail;
