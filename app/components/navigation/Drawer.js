import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import colors from "../../config/colors";
import DrawerItems from "../Layout/DrawerItems";
import { Inbox } from "../../screens/Inbox";
import { Errors } from "../../screens/Errors";
import { AboutScreen } from "../../screens/AboutScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import TabsRoot from "./Tabs";

const Drawer = createDrawerNavigator();
function DrawRoot() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: "#fff",
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
          // marginVertical: 2,
        },
      }}
      drawerContent={(props) => <DrawerItems {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={TabsRoot}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="gauge"
              size={25}
              style={{ marginBottom: 3, alignSelf: "center" }}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Inbox"
        component={Inbox}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="inbox-full"
              size={25}
              style={{ marginBottom: 3, alignSelf: "center" }}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Errors"
        component={Errors}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="alert-circle"
              size={25}
              style={{ marginBottom: 3, alignSelf: "center" }}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="information-variant"
              size={25}
              style={{ marginBottom: 3, alignSelf: "center" }}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cog"
              size={25}
              style={{ marginBottom: 3, alignSelf: "center" }}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawRoot;
