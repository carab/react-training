import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useEscapeKey from "../hooks/useEscapeKey";
import { SearchContext } from "../search/SearchFetcher";

function SearchBar() {
  const { onSearch } = useContext(SearchContext);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const onEscapeKey = useCallback(() => {
    setSearch("");
  }, []);

  useEscapeKey(onEscapeKey);

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
