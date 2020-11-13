const ENDPOINT = "https://pokeapi.co/api/v2";
const LIMIT = 20;

let getPokemonListController;

export async function getPokemonList(page) {
  if (getPokemonListController) {
    getPokemonListController.abort();
  }

  getPokemonListController = new AbortController();

  const url = `${ENDPOINT}/pokemon?offset=${(page - 1) * LIMIT}&limit=${LIMIT}`
  const response = await fetch(url, {
    signal: getPokemonListController.signal,
  });
  const result = await response.json();

  return result;
}
