import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { clearInfoUser, login } from "../../actions/user";

const LoginForm = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFocusUsername, setFocusUsername] = useState(false);
  const [isFocusPassword, setFocusPassword] = useState(false);

  const error = useSelector(state => state.user.error);
  const dispatch = useDispatch();

  useEffect(() => {
    clearInfoUser(dispatch);
  }, []);

  const handleLogin = values => {
    login(dispatch, values);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.login}>Đăng nhập</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        placeholder="Tài khoản"
        onChangeText={value => setUsername(value)}
        value={username}
        style={isFocusUsername ? styles.inputFocus : styles.input}
        onFocus={() => setFocusUsername(true)}
        onBlur={() => setFocusUsername(false)}
      />
      <TextInput
        placeholder="Mật khẩu"
        onChangeText={value => setPassword(value)}
        value={password}
        style={isFocusPassword ? styles.inputFocus : styles.input}
        onFocus={() => setFocusPassword(true)}
        onBlur={() => setFocusPassword(false)}
      />
      <TouchableOpacity
        onPress={() => handleLogin({ username, password })}
        style={styles.button}
      >
        <Text style={styles.textInButton}>Đăng nhập</Text>
      </TouchableOpacity>
      <View style={styles.register}>
        <Text>Nếu chưa có tài khoản, bạn có thể đăng kí tại đây</Text>
        <Text
          style={styles.linkRegister}
          onPress={() => navigation.navigate("SignUp")}
        >
          {" "}
          Đăng kí
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F2",
    alignItems: "center",
    height: 1000,
  },
  login: {
    fontFamily: "Helvetica",
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    letterSpacing: 0.36,
    lineHeight: 34,
    marginTop: "20%",
    marginBottom: "25%",
  },
  error: {
    color: "red",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 90,
    borderColor: "#FFFFFF",
    borderStyle: "solid",
    borderWidth: 1,
    fontFamily: "Helvetica",
    fontSize: 15,
    color: "#000000",
    letterSpacing: -0.24,
    lineHeight: 20,
    marginTop: 14,
    paddingRight: 23,
    paddingLeft: 23,
    width: "85%",
    height: 46,
  },
  inputFocus: {
    backgroundColor: "#FFFFFF",
    borderRadius: 90,
    borderColor: "#41CEBB",
    borderStyle: "solid",
    borderWidth: 1,
    fontFamily: "Helvetica",
    fontSize: 15,
    color: "#000000",
    letterSpacing: -0.24,
    lineHeight: 20,
    marginTop: 14,
    paddingRight: 23,
    paddingLeft: 23,
    width: "85%",
    height: 46,
  },
  button: {
    backgroundColor: "#41CEBB",
    borderRadius: 90,
    width: "85%",
    height: 46,
    paddingRight: 23,
    paddingLeft: 23,
    marginTop: 36,
    elevation: 1,
    justifyContent: "center",
  },
  textInButton: {
    fontFamily: "Helvetica",
    fontSize: 15,
    color: "#FFFFFF",
    letterSpacing: -0.24,
    textAlign: "center",
    lineHeight: 20,
  },
  register: {
    marginTop: 23,
    width: "85%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  linkRegister: {
    fontWeight: "bold",
    color: "#0672cf",
  },
});

export default LoginForm;
