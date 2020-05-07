import React, { useReducer, useContext } from "react";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS,
} from "../types";
import { ScreenContext } from "../screen/screenContext";
import { Alert } from "react-native";
import { Http } from "../../http";

export const TodoState = ({ children }) => {
  const { changeScreen } = useContext(ScreenContext);

  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  const addTodo = async (title) => {
    const { name } = await Http.post(
      "https://delishnik.firebaseio.com/todos.json",
      {
        title,
      }
    );
    dispatch({ type: ADD_TODO, title, id: name });
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get('https://delishnik.firebaseio.com/todos.json')
      const todos = Object.keys(data).map((k) => ({ ...data[k], id: k }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (error) {
      showError("Что то пошло не так...");
      console.error(error);
    } finally {
      hideLoader();
    }
  };

  const removeTodo = (id) => {
    const { title } = state.todos.find((t) => t.id === id);
    Alert.alert(
      "Удаление элемента",
      `Вы уверенны что хотите удалить '${title}'?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          style: "destructive",
          onPress: async () => {
            clearError();

            try {
              changeScreen(null);
              await Http.delete(
                `https://delishnik.firebaseio.com/todos/${id}.json`
              );
              dispatch({ type: REMOVE_TODO, id });
            } catch (error) {
              showError("Что то пошло не так...");
              console.error(error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(`https://delishnik.firebaseio.com/todos/${id}.json`, { title })
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (error) {
      showError("Что то пошло не так...");
      console.error(error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        error: state.error,
        loading: state.loading,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
