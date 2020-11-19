import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  todos: [],
  filter: "SHOW_ALL",
};

let CURRENT_ID = 1;

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.todos.push({
          id: CURRENT_ID++,
          text: action.payload.text,
          completed: false,
        });
        return state;
      },
      prepare(text) {
        return { payload: { text } };
      },
    },
    toggleTodo: {
      reducer(state, action) {
        const todo = state.todos.find((todo) => todo.id === action.payload.id);

        if (todo) {
          todo.completed = !todo.completed;
        }

        return state;
      },
      prepare(id) {
        return { payload: { id } };
      },
    },
    setFilter: {
      reducer(state, action) {
        state.filter = action.payload.filter;

        return state;
      },
      prepare(filter) {
        return { payload: { filter } };
      },
    },
  },
});

export const { addTodo, toggleTodo, setFilter } = todoSlice.actions;

export const todoReducer = todoSlice.reducer;

export function selectTodos(state) {
  return state.todo.todos;
}

export function selectFilteredTodos(state) {
  const filter = selectFilter(state);
  return selectTodos(state).filter((todo) => {
    switch (filter) {
      case "SHOW_NOT_COMPLETED":
        return !todo.completed;
      case "SHOW_COMPLETED":
        return todo.completed;
      default:
        return true;
    }
  });
}

export function selectFilter(state) {
  return state.todo.filter;
}
