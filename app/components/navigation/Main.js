import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Signin from "../../screens/Signin";
import { Signup } from "../../screens/Signup";
import ForgotPassword from "../../screens/ForgotPassword";
import FormDetailsScreen from "../../screens/FormDetailsScreen";
import DrawRoot from "./Drawer";
import TabsRoot from "./Tabs";

const Stack = createNativeStackNavigator();

export default function Main(props) {
  const [auth, setAuth] = useContext(AuthContext);
  const authenticated = auth && auth.token !== "" && auth.user !== null;

  return (
    <Stack.Navigator initialRouteName="Signin">
      {authenticated ? (
        <>
          <Stack.Screen
            name="DrawRoot"
            component={DrawRoot}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FormDetailsScreen"
            component={FormDetailsScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
