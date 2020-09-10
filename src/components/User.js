import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

import Carousel from "./Carousel";

import { logout } from "../actions/user";
import { getListWord, clearListWord } from "../actions/user";

const User = () => {
  const [key, setKey] = useState(0);
  const username = useSelector(state => state.user.username);
  const listData = useSelector(state => state.user.listWord);
  const words = useSelector(state => state.user.words);
  const dispatch = useDispatch();

  useEffect(() => {
    words.map(word => {
      getListWord(dispatch, word);
    });
    return () => {
      clearListWord(dispatch);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setKey(key === 0 ? 1 : 0);
    // eslint-disable-next-line
  }, [words]);

  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <ScrollView>
      <Text>{username}</Text>
      <Button title="Logout" onPress={() => handleLogout()} />
      <View style={styles.container}>
        {words && <Carousel key={key} items={words} listData={listData} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: "red",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default User;