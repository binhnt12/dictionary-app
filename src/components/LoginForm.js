import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { login, signUp } from "../actions/user";

const LoginForm = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameSignUp, setUsernameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");

  const error = useSelector(state => state.user.error);
  const dispatch = useDispatch();

  const handleSignUp = values => {
    signUp(dispatch, values);
  };

  const handleLogin = values => {
    login(dispatch, values);
  };

  return (
    <View>
      {error && <Text>{error}</Text>}
      <Text>Username/email:</Text>
      <TextInput
        onChangeText={value => setUsernameSignUp(value)}
        value={usernameSignUp}
      />
      <Text>Password:</Text>
      <TextInput
        onChangeText={value => setPasswordSignUp(value)}
        value={passwordSignUp}
      />
      <Button
        onPress={() =>
          handleSignUp({
            username: usernameSignUp,
            password: passwordSignUp,
          })
        }
        title="SignUp"
      />
      <Text>Username:</Text>
      <TextInput onChangeText={value => setUsername(value)} value={username} />
      <Text>Password:</Text>
      <TextInput onChangeText={value => setPassword(value)} value={password} />
      <Button
        onPress={() => handleLogin({ username, password })}
        title="Login"
      />
    </View>
  );
};

export default LoginForm;
