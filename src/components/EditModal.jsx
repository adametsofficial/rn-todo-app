import React, { useState } from "react";
import { StyleSheet, View, Modal, TextInput, Alert } from "react-native";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert(
        "Ошибка!",
        `Минимальная длина названия 3 символа. Сейчас ${
          title.trim().length
        } символов`
      );
    } else {
      onSave(title);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.wrap}>
        <TextInput
          style={styles.Input}
          placeholder="Ввидите название"
          maxLength={65}
          value={title}
          onChangeText={setTitle}
        />

        <View style={styles.buttons}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => {
              setTitle(value);
              onCancel();
            }}
          >
            Отменить
          </AppButton>
          <AppButton onPress={saveHandler}>Сохранить</AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%",
  },
  buttons: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
