import React from "react";
import { useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { selectTodos } from "../todo/todoSlice";

function Navbar() {
  const todos = useSelector(selectTodos);

  return (
    <nav className="App-nav">
      <Route exact path="/">
        {(props) => (
          <Link to="/" aria-current={props.match ? "page" : undefined}>
            Home
          </Link>
        )}
      </Route>
      <Route path="/pokemon">
        {(props) => (
          <Link to="/pokemon" aria-current={props.match ? "page" : undefined}>
            Pokémon
          </Link>
        )}
      </Route>
      <Route path="/todo">
        {(props) => (
          <Link to="/todo" aria-current={props.match ? "page" : undefined}>
            Todo ({todos.filter((todo) => !todo.completed).length})
          </Link>
        )}
      </Route>
    </nav>
  );
}

export default Navbar;
