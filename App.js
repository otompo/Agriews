import React from "react";
import { LogBox } from "react-native";
import RootNavigation from "./app/RootNavigation";

LogBox.ignoreAllLogs(true);
export default () => <RootNavigation />;
