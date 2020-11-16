const ENDPOINT = "https://pokeapi.co/api/v2";
const LIMIT = 20;

let getPokemonListController: AbortController | null;

export type PokemonItemModel = {
  name: string;
};

export type PokemonListModel = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonItemModel[];
};

export function isPokemonItemModel(subject: any): subject is PokemonItemModel {
  return (
    null !== subject &&
    typeof subject === "object" &&
    typeof subject.name === "string"
  );
}

export function isPokemonListModel(subject: any): subject is PokemonListModel {
  return (
    null !== subject &&
    typeof subject === "object" &&
    typeof subject.count === "number" &&
    (typeof subject.next === "string" || null === subject.next) &&
    (typeof subject.previous === "string" || null === subject.previous) &&
    Array.isArray(subject.results) &&
    subject.results.every(isPokemonItemModel)
  );
}

export async function getPokemonList(page: number): Promise<PokemonListModel> {
  if (getPokemonListController) {
    getPokemonListController.abort();
  }

  getPokemonListController = new AbortController();

  const url = `${ENDPOINT}/pokemon?offset=${(page - 1) * LIMIT}&limit=${LIMIT}`;
  const response = await fetch(url, {
    signal: getPokemonListController.signal,
  });
  const result = await response.json();

  return result;
}
