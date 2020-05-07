import React, { useState, useEffect, useContext, useCallback } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import AddTodo from "../components/AddTodo";
import Todo from "../components/Todo";
import { AppTextBold } from "../components/ui/AppTextBold";
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";
import { AppLoader } from "../components/ui/AppLoader";
import { AppText } from "../components/ui/AppText";
import { AppButton } from "../components/ui/AppButton";

export const MainScreen = () => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );
  const { todos, addTodo, removeTodo, fetchTodos, loading, error } = useContext(
    TodoContext
  );
  const { changeScreen } = useContext(ScreenContext);

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };

    Dimensions.addEventListener("change", update);

    return () => {
      Dimensions.removeEventListener("change", update);
    };
  });
  console.log(loading);

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Повторить</AppButton>
      </View>
    );
  }

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        style={styles.flatList}
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
        )}
      />
    </View>
  );

  if (!todos.length) {
    content = (
      <View style={styles.notFound}>
        <Image
          resizeMode="contain"
          style={styles.notFound}
          source={require("../../assets/document.png")}
        />
        <AppTextBold style={styles.Text}>Дела не найдены</AppTextBold>
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  notFound: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 100,
    marginTop: 10,
  },
  notFoundImg: {
    width: "100%",
    height: "100%",
  },
  Text: {
    marginTop: 10,
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
    marginBottom: 10
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    marginBottom: 100
  }
});
