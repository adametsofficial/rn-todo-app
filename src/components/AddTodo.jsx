import React, { useState } from "react";
import { StyleSheet, Button, TextInput, View, Alert, Keyboard } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { THEME } from "../theme";

const AddTodo = ({ onSubmit }) => {
  const [title, setTitle] = useState("");

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Введите название дела..."
        maxLength={65}
      />
      <AntDesign.Button
        name="pluscircleo"
        onPress={async () => {
          if (!title.trim()) {
            return Alert.alert("Название дела не может быть пустым...");
          }
          await onSubmit(title);
          setTitle("");
          return Keyboard.dismiss()
        }}
      >
        Добавить
      </AntDesign.Button>
    </View>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },

  input: {
    width: "60%",
    padding: 10,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  },
});
