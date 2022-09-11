import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

function FormListItem({
  title,
  subTitle,
  subSubTitle,
  onPress,
  IconComponent,
  renderRightActions,
  icon = "chevron-right",
  size,
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
          <View style={styles.container}>
            {IconComponent}
            <View style={styles.detailsContainer}>
              <AppText style={styles.title} numberOfLines={1}>
                {title}
              </AppText>
              {subTitle && (
                <AppText style={styles.subTitle} numberOfLines={2}>
                  {subTitle}
                </AppText>
              )}
              {subSubTitle && (
                <AppText style={styles.subSubTitle} numberOfLines={2}>
                  {subSubTitle}
                </AppText>
              )}
            </View>
            <MaterialCommunityIcons
              name={icon}
              size={25}
              color={colors.medium}
            />
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

export default FormListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    marginTop: 5,
  },

  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.dark,
    textTransform: "uppercase",
  },
  subTitle: {
    color: colors.medium,
    fontSize: 12,
  },
  subSubTitle: {
    color: colors.primary,
    fontSize: 12,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
});
