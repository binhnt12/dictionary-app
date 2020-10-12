import React from "react";
import { useSelector } from "react-redux";

import LoginAndRegisterScreen from "../navigation/LoginAndRegisterNavigator";
import User from "../components/User";

const Home = ({ navigation }) => {
  const token = useSelector(state => state.user.token);

  return token ? <User navigation={navigation} /> : <LoginAndRegisterScreen />;
};

export default Home;
