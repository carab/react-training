import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import * as yup from "yup";

const pokemonApiDetailSchema = yup.object().shape({
  name: yup.string().defined(),
  weight: yup.number().defined(),
  sprites: yup.object().shape({
    front_default: yup.string().defined(),
  }).defined(),
  types: yup.array().of(
    yup.object().shape({
      slot: yup.number().defined(),
      type: yup.object().shape({
        name: yup.string().defined(),
      }),
    }).required()
  ).required(),
});

type PokemonApiDetail = yup.TypeOf<typeof pokemonApiDetailSchema>

export function isPokemonApiDetail(subject: any): subject is PokemonApiDetail {
  try {
    pokemonApiDetailSchema.validateSync(subject)
    
    return true;
  } catch (error) {
    return false;
  }
}

function isSchemaOf<S extends yup.BaseSchema>(subject: any, schema: S): subject is yup.TypeOf<typeof schema> {
  try {
    schema.validateSync(subject)
    
    return true;
  } catch (error) {
    return false;
  }
}

function makeUrl(name: string) {
  return `https://pokeapi.co/api/v2/pokemon/${name}`;
}

function PokemonDetail() {
  const { name } = useParams<{ name: string }>();
  const [result, error, loading] = useFetch(makeUrl(name), isPokemonApiDetail);

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
