import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../config/baseUrl";

const AuthContext = createContext([{}, function () {}]);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // config axios
  const token = auth && auth.token ? auth.token : "";
  // console.log(token);
  //   configure axios
  axios.defaults.baseURL = API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const as = JSON.parse(data);
      setAuth({ ...auth, user: as.user, token: as.token });
    };
    loadFromAsyncStorage();
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
