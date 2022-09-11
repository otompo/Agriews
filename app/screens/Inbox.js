// import {
//   Divider,
//   Layout,
//   Text,
//   TopNavigation,
//   TopNavigationAction,
// } from "@ui-kitten/components";

import React from "react";
import { Dimensions, Text, View } from "react-native";
import Header from "../components/Header";
var { width } = Dimensions.get("window");

export const Inbox = ({ navigation }) => {
  return (
    <>
      <Header
        navigation={navigation}
        HeaderTitle="Inbox"
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        height={width / 2 - 50}
        // onPress={() => navigation.navigate("Messages")}
        marginBottom={10}
      />
      <View>
        <Text>Inbox</Text>
        {/* <Divider /> */}
      </View>
    </>
  );
};
