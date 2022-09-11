import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppTextInput from "../components/Auth/AppTextInput";
import SubmitButton from "../components/Button/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/authContext";
import colors from "../config/colors";
import Header from "../components/Header";
import axios from "axios";

function Signin({ navigation }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  // useEffect(() => {
  //   if (auth) {
  //     navigation.navigate("DrawRoot");
  //   }
  // }, [auth]);

  const handleSubmit = async () => {
    setLoading(true);
    if (!username || !password) {
      if (Platform.OS === "android") {
        ToastAndroid.showWithGravityAndOffset(
          "All fields are required",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else {
        AlertIOS.alert("All fields are required");
      }
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`/users/login`, {
        username,
        password,
      });

      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setAuth(data);
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        setLoading(false);
        navigation.navigate("DrawRoot");
        if (Platform.OS === "android") {
          ToastAndroid.showWithGravityAndOffset(
            "Success",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        } else {
          AlertIOS.alert("Success");
        }
        setLoading(false);
        return;
      }
    } catch (err) {
      console.log(err);
      if (Platform.OS === "android") {
        ToastAndroid.showWithGravityAndOffset(
          err.response.data.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else {
        AlertIOS.alert(err.response.data.message);
      }
      setLoading(false);
      return;
    }
  };

  return (
    <>
      <Header HeaderTitle="Signin" justifyContent="center" />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{ flexGrow: 1 }} // make the scrollView full screen
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/syncLogo-1.png")}
            style={{ width: "83%", height: 100 }}
          />
          <Text
            center
            style={{ marginTop: 20, fontWeight: "bold", fontSize: 18 }}
          >
            Welcome Signin below
          </Text>
        </View>

        <View style={styles.MainContainer}>
          <AppTextInput
            autoCapitalize="words"
            autoCorrect={false}
            icon="account"
            placeholder="Enter username"
            value={username}
            setValue={setUserName}
          />

          <AppTextInput
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            value={password}
            setValue={setPassword}
            placeholder="Enter Password"
            secureTextEntry
            textContentType="password"
            autoCompleteType="password"
          />

          <SubmitButton
            title="Signin"
            onPress={handleSubmit}
            loading={loading}
          />

          <Text center style={{ marginTop: 10 }}>
            Don't have an account?{" "}
            <Text
              onPress={() => navigation.navigate("Signup")}
              color={colors.primary}
            >
              Create Account
            </Text>
          </Text>

          <Text
            onPress={() => navigation.navigate("ForgotPassword")}
            center
            color={colors.primary}
            style={{ marginTop: 15 }}
          >
            Forgot Password?
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
export default Signin;
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
  MainContainer: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: -15,
  },
});
