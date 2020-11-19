import { useState, useCallback, createContext } from "react";

export const SearchContext = createContext({
  result: [],
  onSearch: () => {},
});

function SearchFetcher({ children }) {
  const [result, setResult] = useState(null);

  const onSearch = useCallback(async function onSearch(filters) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?term=${filters.term}&showActive=${filters.active}`
    );
    const result = await response.json();

    setResult(result);
  }, []);

  const contextValue = { result, onSearch };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchFetcher;
