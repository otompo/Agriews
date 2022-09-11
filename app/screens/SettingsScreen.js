import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
var { width } = Dimensions.get("window");

function SettingsScreen({ navigation }) {
  return (
    <>
      <Header
        navigation={navigation}
        HeaderTitle="Settings"
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        height={width / 2 - 50}
        // onPress={() => navigation.navigate("Messages")}
        marginBottom={10}
      />
      <Text>Settings Screen</Text>
    </>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({});
