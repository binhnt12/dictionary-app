import React from "react";
import { StyleSheet, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

import Home from "../screen/Home";
import Search from "../screen/Search";
import CreateWord from "../screen/CreateWord";
import Loading from "../components/Loading";
import ImgLoading from "../images/Spin-1s-200px.gif";
import Background from "../components/Background";

const Tab = createMaterialTopTabNavigator();

const BottomTabNavigator = () => {
  const loading = useSelector(state => state.loading.loading);
  const loading2 = useSelector(state => state.loading.loading2);
  return [
    loading && (
      <Loading
        key="loading"
        image={ImgLoading}
        backgroundColor="rgba(0,0,0,0.5)"
        width={100}
        height={100}
      />
    ),

    loading2 && <Background key="loading-2" />,

    <Tab.Navigator
      key="tab-navigator"
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
    </Tab.Navigator>,
  ];
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
