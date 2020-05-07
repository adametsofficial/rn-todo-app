import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, SHOW_LOADER, FETCH_TODOS, CLEAR_ERROR, SHOW_ERROR, HIDE_LOADER } from "../types";

export const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: action.id, title: action.title },
        ],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            todo.title = action.title;
          }
          return todo;
        }),
      };
    case SHOW_LOADER: 
      return { ...state, loading: true }
    case HIDE_LOADER:
      return { ...state, loading: false }
    case CLEAR_ERROR: 
      return { ...state, error: null }
    case SHOW_ERROR:
      return { ...state, error: action.error }
    case FETCH_TODOS: 
      return { ...state, todos: action.todos }
    default:
      return state;
  }
};
