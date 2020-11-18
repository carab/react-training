import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEscapeKey from "../hooks/useEscapeKey";

function SearchBar() {
  const [result, setResult] = useState(null);

  const onSearch = useCallback(async function onSearch(filters) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?term=${filters.term}&showActive=${filters.active}`);
    const result = await response.json();

    setResult(result);
  }, [])

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const onEscapeKey = useCallback(() => {
    setSearch('')
  }, [])

  useEscapeKey(onEscapeKey)

  useEffect(
    function debounceEffect() {
      async function debounceTimeout() {
        setDebouncedSearch(search);
      }

      const timeout = setTimeout(debounceTimeout, 300);
      return function debounceCleanup() {
        clearTimeout(timeout);
      };
    },
    [search]
  );

  const filters = useMemo(() => {
    return {
      term: debouncedSearch,
      showActive: false,
    };
  }, [debouncedSearch]);

  useEffect(
    function searchEffect() {
      onSearch(filters);
    },
    [onSearch, filters]
  );

  const inputRef = useRef();

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button onClick={() => inputRef.current.focus()}>Search</button>
    </>
  );
}

export default SearchBar;
