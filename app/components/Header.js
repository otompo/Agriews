import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../config/colors";
var { width } = Dimensions.get("window");

function Header({
  navigation,
  HeaderTitle,
  HeaderSubTitle,
  justifyContent = "space-between",
  cartData,
  onPress,
  textLeft = 100,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  height,
  marginBottom,
}) {
  return (
    <SafeAreaView
      style={[
        styles.headerMain,
        {
          borderBottomLeftRadius: borderBottomLeftRadius,
          borderBottomRightRadius: borderBottomRightRadius,
          height: height,
          marginBottom: marginBottom,
        },
      ]}
    >
      <View style={[styles.headerInner, { justifyContent: justifyContent }]}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          {navigation && <Icon name="menu-outline" size={35} color="#fff" />}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{HeaderTitle}</Text>
        <Text style={[styles.headerSubTitle, { left: textLeft }]}>
          {HeaderSubTitle}
        </Text>
      </View>
      {cartData && (
        <TouchableOpacity style={styles.cartDataStyle} onPress={onPress}>
          <Text style={{ color: colors.white, fontWeight: "500" }}>
            {cartData}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

export default Header;

const styles = StyleSheet.create({
  headerMain: {
    width: width,
    height: width / 2 - 35,
    backgroundColor: colors.primary,
    elevation: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    position: "relative",
  },
  headerInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
  },
  headerTitle: { color: "#fff", textTransform: "uppercase" },
  headerSubTitle: {
    position: "absolute",
    color: "#fff",
    textTransform: "uppercase",
    top: 0,
    left: 100,
  },
  cartDataStyle: {
    height: 25,
    width: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.danger,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 25,
    top: 5,
  },
});
