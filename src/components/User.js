import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "native-base";

import Carousel from "./Carousel";

import { logout } from "../actions/user";
import { getListWord, clearListWord } from "../actions/user";

const User = () => {
  const [key, setKey] = useState(0);
  const [selected, setSelected] = useState(1);

  const username = useSelector(state => state.user.username);
  const listWordUnknown = useSelector(state => state.user.listWord.unknown);
  const listWordKnown = useSelector(state => state.user.listWord.known);
  const dispatch = useDispatch();

  let listWord = selected === 1 ? listWordUnknown : listWordKnown;

  useEffect(() => {
    getListWord(dispatch);
    return () => {
      clearListWord(dispatch);
    };
  }, []);

  useEffect(() => {
    setKey(key === 0 ? 1 : 0);
  }, [listWord]);

  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <ScrollView>
      <Text>{username}</Text>
      <Button title="Logout" onPress={() => handleLogout()} />
      <View style={styles.container}>
        <Picker
          mode="dropdown"
          style={{ width: 200 }}
          selectedValue={selected}
          onValueChange={setSelected}
        >
          <Picker.Item label="Chưa biết" value={1} />
          <Picker.Item label="Đã biết" value={2} />
        </Picker>
        {listWord && (
          <Carousel key={key} items={listWord} unknown={selected === 1} />
        )}
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
