import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FormsScreen from "../../screens/FormsScreen";
import Profile from "../../screens/Profile";
import { Text, View } from "react-native";
import Dashboard from "../../screens/Dashboard";
const Tab = createBottomTabNavigator();

export default function TabsRoot(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="home"
                size={25}
                style={{ marginBottom: 3, alignSelf: "center" }}
                color={focused ? "green" : "black"}
              />
              {/* <Text style={{ color: focused ? "crimson" : "black" }}>Home</Text> */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="FormsScreen"
        component={FormsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="form-select"
                size={25}
                style={{ marginBottom: 3, alignSelf: "center" }}
                color={focused ? "green" : "black"}
              />
              {/* <Text style={{ color: focused ? "crimson" : "black" }}>
                Forms
              </Text> */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="account"
                size={25}
                style={{ marginBottom: 3, alignSelf: "center" }}
                color={focused ? "green" : "black"}
              />
              {/* <Text style={{ color: focused ? "crimson" : "black" }}>
                Profile
              </Text> */}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// export default TabsRoot();
