import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";

var { width } = Dimensions.get("window");
function Dashboard({ navigation }) {
  return (
    <>
      <Header
        navigation={navigation}
        HeaderTitle="Home"
        // cartData={2}
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        height={width / 2 - 50}
        marginBottom={10}
        onPress={() => navigation.navigate("Messages")}
      />
      <View>
        <Text>Dashboard</Text>
      </View>
      {/* <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <Text>HomeScreen</Text>
      </TouchableOpacity> */}
    </>
  );
}

export default Dashboard;

const styles = StyleSheet.create({});
