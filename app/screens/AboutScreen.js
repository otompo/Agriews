import React from "react";
import { Dimensions, Text, View } from "react-native";
import Header from "../components/Header";
var { width } = Dimensions.get("window");

export const AboutScreen = ({ navigation }) => {
  return (
    <>
      <Header
        navigation={navigation}
        HeaderTitle="About"
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        height={width / 2 - 50}
        // onPress={() => navigation.navigate("Messages")}
        marginBottom={10}
      />
      <Text>About Screen</Text>
    </>
  );
};
