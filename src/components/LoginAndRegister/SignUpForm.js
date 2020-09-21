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

import { clearInfoUser, signUp } from "../../actions/user";

const SignUpForm = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isFocusUsername, setFocusUsername] = useState(false);
  const [isFocusPassword, setFocusPassword] = useState(false);
  const [isFocusRePassword, setFocusRePassword] = useState(false);

  const error = useSelector(state => state.user.error);
  const dispatch = useDispatch();

  useEffect(() => {
    clearInfoUser(dispatch);
  }, []);

  const handleSignUp = values => {
    signUp(dispatch, values);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.register}>Đăng kí</Text>
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
      <TextInput
        placeholder="Nhập lại mật khẩu"
        onChangeText={value => setRePassword(value)}
        value={rePassword}
        style={isFocusRePassword ? styles.inputFocus : styles.input}
        onFocus={() => setFocusRePassword(true)}
        onBlur={() => setFocusRePassword(false)}
      />
      <TouchableOpacity
        onPress={() => handleSignUp({ username, password, rePassword })}
        style={styles.button}
      >
        <Text style={styles.textInButton}>Đăng kí</Text>
      </TouchableOpacity>
      <View style={styles.login}>
        <Text>Nếu bạn đã có tài khoản, đăng nhập tại đây</Text>
        <Text style={styles.linkLogin} onPress={() => navigation.push("Login")}>
          {" "}
          Đăng nhập
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
  register: {
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
  login: {
    marginTop: 23,
    width: "85%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  linkLogin: {
    fontWeight: "bold",
    color: "#0672cf",
  },
});

export default SignUpForm;
