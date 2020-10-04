import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import LoginAndRegisterScreen from "../navigation/LoginAndRegisterNavigator";
import User from "../components/User";

import { getToken } from "../actions/user";

const Home = () => {
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    getToken(dispatch);
  }, []);
  // TODO
  return token ? <User /> : <LoginAndRegisterScreen />;
};

export default Home;
