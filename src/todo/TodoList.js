import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  selectFilter,
  selectFilteredTodos,
  setFilter,
  toggleTodo,
} from "./todoSlice";

const { useState } = require("react");

function TodoList() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector(selectFilteredTodos);
  const filter = useSelector(selectFilter);

  function onSubmit(event) {
    event.preventDefault();

    if (text) {
      dispatch(addTodo(text));
    }

    setText("");
  }

  function onToggleChange(todo) {
    dispatch(toggleTodo(todo.id));
  }

  function onFilterChange(event) {
    dispatch(setFilter(event.target.value));
  }

  return (
    <div>
      <select value={filter} onChange={onFilterChange}>
        <option value="SHOW_ALL">Tous</option>
        <option value="SHOW_NOT_COMPLETED">A faire</option>
        <option value="SHOW_COMPLETED">Complétés</option>
      </select>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <p>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleChange(todo)}
              />
              {todo.text}
            </p>
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit}>
        <label htmlFor="text">New todo</label>
        <input
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TodoList;
