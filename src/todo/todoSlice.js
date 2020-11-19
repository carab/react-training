

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
  switch (action.type) {
    case "todo/add":
      return {
        ...state,
        todos: [
          ...state.todos,
          { ...initialTodoState, id: CURRENT_ID++, text: action.payload.text },
        ],
      };

    case "todo/toggle":
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };

    case "todo/filter/set":
      return {
        ...state,
        filter: action.payload.filter,
      };

    default:
      return state;
  }
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
