import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import LoginForm from "../components/LoginForm";
import User from "../components/User";

import { getToken } from "../actions/user";

const Home = () => {
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    getToken(dispatch);
    // eslint-disable-next-line
  }, []);

  return token ? <User /> : <LoginForm />;
};

export default Home;
