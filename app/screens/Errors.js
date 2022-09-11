import React from "react";
import { Dimensions, Text, View } from "react-native";
import Header from "../components/Header";
var { width } = Dimensions.get("window");

export function Errors({ navigation }) {
  return (
    <>
      <Header
        navigation={navigation}
        HeaderTitle="Errors"
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        height={width / 2 - 50}
        // onPress={() => navigation.navigate("Messages")}
        marginBottom={10}
      />
      <Text>Errors</Text>
    </>
  );
}
