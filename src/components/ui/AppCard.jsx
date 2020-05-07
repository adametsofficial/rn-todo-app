import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const AppCard = ({ style, children }) => (
  <View style={{...style, ...styles.default}}>{children}</View>
);

const styles = StyleSheet.create({
  default: {
    padding: 20,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.3,
    elevation: 8,
    shadowOffset: { width: 2, height: 2 },
    backgroundColor: '#fff',
    borderRadius: 10,
    
  },
});
