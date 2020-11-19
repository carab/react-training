import { SearchContext } from "../search/SearchFetcher";

function SearchResult() {
  return (
    <SearchContext.Consumer>
      {function searchConsumer({ result }) {
        return result ? (
          <ul>
            {result.results.map((pokemon) => (
              <li key={pokemon.name}>{pokemon.name}</li>
            ))}
          </ul>
        ) : null;
      }}
    </SearchContext.Consumer>
  );
}

export default SearchResult;
