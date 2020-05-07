import React, { useState, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";
import { AppText } from "../components/ui/AppText";
import { AppButton } from "../components/ui/AppButton";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";

const { DANGER_COLOR, GRAY_COLOR } = THEME;

export const TodoScreen = () => {
  const { todos, removeTodo, updateTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);
  const { title, id } = todos.find((t) => t.id === todoId);

  const [modal, setModal] = useState(false);

  const saveHandler = async (ChangedTitle) => {
    await updateTodo(todoId, ChangedTitle);
    setModal(false);
  };

  return (
    <View>
      <EditModal
        visible={modal}
        onCancel={() => setModal(false)}
        value={title}
        onSave={saveHandler}
      />

      <AppCard style={styles.card}>
        <AppText style={styles.title}>{title}</AppText>

        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.btns}>
        <View style={styles.button}>
          <AppButton color={GRAY_COLOR} onPress={() => changeScreen(null)}>
            <AntDesign name="back" size={20} />
          </AppButton>
        </View>

        <View style={styles.button}>
          <AppButton color={DANGER_COLOR} onPress={() => removeTodo(id)}>
            <FontAwesome name="trash" size={20} />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: Dimensions.get("window").width / 3,
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
});
// #3949ab
