import React from "react";
import { StyleSheet, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../screen/Home";
import Search from "../screen/Search";
import CreateWord from "../screen/CreateWord";

const Tab = createMaterialTopTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarPosition="bottom"
      tabBarOptions={{
        showIcon: true,
        tabStyle: { padding: 0 },
        indicatorStyle: { backgroundColor: "#0672cf" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={25}
              color={focused ? "#0672cf" : "#a0a0a0"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.textFocused : styles.text}>Home</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="magnify"
              size={25}
              color={focused ? "#0672cf" : "#a0a0a0"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.textFocused : styles.text}>
              Search
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="CreateWord"
        component={CreateWord}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="format-annotation-plus"
              size={25}
              color={focused ? "#0672cf" : "#a0a0a0"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.textFocused : styles.text}>
              Create Word
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    color: "#a0a0a0",
  },
  textFocused: {
    fontSize: 11,
    color: "#0672cf",
  },
});

export default BottomTabNavigator;
