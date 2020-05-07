import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AppText } from "./ui/AppText";

const Todo = ({ todo: { title, id }, onRemove, onOpen }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      onPress={() => onOpen(id)}
      onLongPress={async () => {
        console.log("touched --deleted element ->", id);
        return onRemove(id);
      }}
    >
      <View style={styles.todo}>
        <AppText style={styles.title}>{title}</AppText>
      </View>
    </TouchableOpacity>
  );
};

export default Todo;

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginVertical: 5,
  },
});
