import React, { useState, useContext, useEffect } from "react";
import {
  View,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FormListItem from "../components/FormListItem";
import Header from "../components/Header";
import axios from "axios";

var { width } = Dimensions.get("window");

function FormsScreen({ navigation }) {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/agriews/getAllForms`);
      setForms(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadForms();
      setRefreshing(false);
    }, 2000);
  };

  if (loading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flex: 1,
        }}
      >
        <ActivityIndicator size="large" />
        <Text>Loading Forms ...</Text>
      </View>
    );
  }

  return (
    <>
      <Header
        navigation={navigation}
        HeaderTitle={<MaterialCommunityIcons name="bell" size={30} />}
        cartData={2}
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        height={width / 2 - 50}
        onPress={() => navigation.navigate("Inbox")}
        marginBottom={10}
      />
      {/* <Text>{JSON.stringify(forms, null, 4)}</Text> */}
      <FlatList
        data={forms}
        keyExtractor={(forms, index) => forms.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              elevation: 2,
              marginBottom: 5,
            }}
          >
            <FormListItem
              title={item.formName}
              subTitle={item.formDescription}
              onPress={() => navigation.navigate("FormDetailsScreen", item)}
            />
          </View>
        )}
      />
    </>
  );
}

export default FormsScreen;

const styles = StyleSheet.create({});
