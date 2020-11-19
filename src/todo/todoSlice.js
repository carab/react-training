import produce from "immer";

export function addTodo(text) {
  return {
    type: "todo/add",
    payload: {
      text,
    },
  };
}

export function toggleTodo(id) {
  return {
    type: "todo/toggle",
    payload: {
      id,
    },
  };
}

export function setFilter(filter) {
  return {
    type: "todo/filter/set",
    payload: {
      filter,
    },
  };
}

export const initialState = {
  todos: [],
  filter: "SHOW_ALL",
};

let CURRENT_ID = 1;
export const initialTodoState = { completed: false };

export function todoReducer(state = initialState, action) {
  return produce(state, (state) => {
    switch (action.type) {
      case "todo/add":
        state.todos.push({
          ...initialTodoState,
          id: CURRENT_ID++,
          text: action.payload.text,
        });

        break;

      case "todo/toggle":
        const todo = state.todos.find((todo) => todo.id === action.payload.id);

        if (todo) {
          todo.completed = !todo.completed;
        }

        break;

      case "todo/filter/set":
        state.filter = action.payload.filter;
        break;

      default:
        break;
    }

    return state;
  });
}

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
