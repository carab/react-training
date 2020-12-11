import { PokemonApiList, isPokemonApiList } from "./pokemonListSlice";

class PokemonListService {
  currentController: AbortController | undefined;

  limit = 20;

  makeUrl(page: number) {
    return `https://pokeapi.co/api/v2/pokemon?offset=${
      (page - 1) * this.limit
    }&limit=${this.limit}`;
  }

  async get(page: number): Promise<PokemonApiList> {
    if (this.currentController) {
      this.currentController.abort();
    }

    this.currentController = new AbortController();

    const response = await fetch(this.makeUrl(page), {
      signal: this.currentController.signal,
    });

    const result: unknown = await response.json();

    if (isPokemonApiList(result)) {
        return result;
    } else {
        throw new Error('API result is not of the expected type.')
    }
  }
}

const pokemonListService = new PokemonListService();

export default pokemonListService;
