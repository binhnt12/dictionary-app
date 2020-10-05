import React, { memo, useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

import Carousel from "./Carousel";
import Sidebar from "./Sidebar";

import { logout } from "../actions/user";
import { getListWord, clearListWord } from "../actions/word";
import { COLORS } from "../contants/colors";
import Message from "./Message";
import { MESSAGES } from "../contants/messages";

const { height } = Dimensions.get("window");

const Container = styled.View`
  min-height: ${height}px;
  background-color: ${props =>
    props.isShowModal ? "rgba(0,0,0,0.5)" : COLORS.whiteBlue};
`;

const Welcome = styled.Text`
  margin-top: 16px;
  font-size: 25px;
  font-weight: bold;
  align-self: center;
  color: ${COLORS.black};
`;

const User = () => {
  const [key, setKey] = useState(0);
  const [isUnknown, setUnknown] = useState(true);
  const [isShowModal, setShowModal] = useState(false);

  const username = useSelector(state => state.user.username);
  const listWordUnknown = useSelector(state => state.word.listWord.unknown);
  const listWordKnown = useSelector(state => state.word.listWord.known);
  const errorWord = useSelector(state => state.word.error);
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  let listWord = isUnknown ? listWordUnknown : listWordKnown;

  useEffect(() => {
    getListWord(dispatch, token);
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

  const handleUnknown = useCallback(
    value => {
      setUnknown(value);
    },
    [handleUnknown],
  );

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
        <Container isShowModal={isShowModal}>
          <StatusBar backgroundColor="#0672cf" />
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.menu}
              onPress={() => setShowModal(true)}
            >
              <Icon
                style={styles.menuIcon}
                name="menu"
                size={35}
                color="#fc9f0d"
              />
            </TouchableOpacity>
          </View>
          {listWord.length === 0 && <Welcome>{`Welcome ${username}!`}</Welcome>}
          {!!errorWord && (
            <Message type="error">{MESSAGES[errorWord].text}</Message>
          )}
          <View
            style={styles.slideShow}
            onStartShouldSetResponder={() => !isShowModal}
            onPress={() => setShowModal(false)}
          >
            {listWord && (
              <Carousel key={key} items={listWord} unknown={isUnknown} />
            )}
          </View>
        </Container>
      </TouchableWithoutFeedback>

      <Sidebar
        username={username}
        handleUnknownProps={handleUnknown}
        logout={handleLogout}
        isShowModal={isShowModal}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: height,
  },
  containerHasModal: {
    minHeight: height,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  header: {
    height: 48,
    backgroundColor: "#0672cf",
    justifyContent: "center",
  },
  menu: {},
  menuIcon: {
    padding: 10,
  },
  username: {
    marginTop: 16,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
  text: {
    backgroundColor: "red",
  },
  slideShow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default memo(User);
