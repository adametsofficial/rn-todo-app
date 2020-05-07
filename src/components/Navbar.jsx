import React from "react";
import { StyleSheet, Platform, View, StatusBar } from "react-native";
import { THEME } from "../theme";
import { AppTextBold } from "./ui/AppTextBold";

const Navbar = ({ title }) => {
  if (Platform.OS === "ios") {
    StatusBar.setBarStyle("dark-content");
  }

  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navbarIos,
          android: styles.navbarAndroid,
        }),
      }}
    >
      <AppTextBold style={{ ...styles.text }}>{title}</AppTextBold>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 15,
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  navbarIos: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1,
  },

  text: {
    color: Platform.OS === "ios" ? THEME.MAIN_COLOR : "white",
    fontSize: 20,
  },
});
