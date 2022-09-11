import React, { useState, useContext, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/authContext";
import colors from "../../config/colors";

export default function DrawerItems(props) {
  const [auth, setAuth] = useContext(AuthContext);
  const [name, setName] = useState("");

  useEffect(() => {
    if (auth.user) {
      const { name } = auth.user;
      setName(name);
    }
  }, [auth]);

  const handleSignout = async () => {
    setAuth({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          // flexDirection: "row",
          margin: 0,
          backgroundColor: colors.primary,
          padding: 10,
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            // borderRadius: 100,
            marginLeft: 10,
            // borderWidth: 2,
            // borderColor: colors.white,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/syncLogo-1.png")}
            style={{
              width: 80,
              height: 80,
              padding: 25,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: colors.white,
              backgroundColor: colors.white,
            }}
          />
        </View>

        <View>
          <Text
            style={{
              color: colors.white,
              fontSize: 14,
              paddingLeft: 10,
              fontWeight: "bold",
            }}
          >
            Ministry of Food and Africulture
          </Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            paddingTop: 5,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* <Divider /> */}
      <View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 20,
            marginBottom: 20,
          }}
          onPress={handleSignout}
        >
          <Icon name="power" size={30} color={colors.danger} />
          <Text style={{ color: "#333", fontSize: 16, paddingLeft: 10 }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
