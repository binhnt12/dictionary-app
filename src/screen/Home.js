import React from "react";
import { useSelector } from "react-redux";

import LoginAndRegisterScreen from "../navigation/LoginAndRegisterNavigator";
import User from "../components/User";

const Home = () => {
  const token = useSelector(state => state.user.token);

  return token ? <User /> : <LoginAndRegisterScreen />;
};

export default Home;
