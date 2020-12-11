class PokemonListService {
  currentController: AbortController | undefined;

  limit = 20;

  makeUrl(page: number) {
    return `https://pokeapi.co/api/v2/pokemon?offset=${
      (page - 1) * this.limit
    }&limit=${this.limit}`;
  }

  async get(page: number) {
    if (this.currentController) {
      this.currentController.abort();
    }

    this.currentController = new AbortController();

    const response = await fetch(this.makeUrl(page), {
      signal: this.currentController.signal,
    });

    const result = await response.json();

    return result;
  }
}

const pokemonListService = new PokemonListService();

export default pokemonListService;
