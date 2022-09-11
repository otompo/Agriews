import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import Main from "./components/navigation/Main";
import colors from "./config/colors";
import { AuthProvider } from "./context/authContext";
export default function RootNavigation() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor={colors.primary} />
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </AuthProvider>
  );
}
