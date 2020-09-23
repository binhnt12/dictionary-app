import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
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
import { getListWord, clearListWord } from "../actions/user";
import { COLORS } from "../contants/colors";

const { width, height } = Dimensions.get("window");

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
  const [translateX, setTranslateX] = useState(null);
  const [isShowModal, setShowModal] = useState(false);
  const isFirstRun = useRef(true);

  const username = useSelector(state => state.user.username);
  const listWordUnknown = useSelector(state => state.user.listWord.unknown);
  const listWordKnown = useSelector(state => state.user.listWord.known);
  const dispatch = useDispatch();

  // let listWordRef = isUnknown ? listWordUnknown : listWordKnown;
  let translateValue = new Animated.Value(0);

  console.log(1111);

  const listWord = useMemo(
    () => (isUnknown ? listWordUnknown : listWordKnown),
    [isUnknown],
  );

  useEffect(() => {
    getListWord(dispatch);
    return () => {
      clearListWord(dispatch);
    };
  }, []);

  useEffect(() => {
    setKey(key === 0 ? 1 : 0);
  }, [listWord]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setTranslateX(translateModal);
    Animated.timing(translateValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 300,
    }).start();
  }, [isShowModal]);

  const handleLogout = () => {
    logout(dispatch);
  };

  const handleUnknown = useCallback(value => {
    setUnknown(value);
  }, []);

  const translateModal = translateValue.interpolate({
    inputRange: [0, 1],
    outputRange: isShowModal ? [-width, 0] : [0, -width],
  });

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
          {(!listWord || !username) && (
            <Welcome>{`Welcome ${username}!`}</Welcome>
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
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{ translateX: translateX || -width }],
          },
        ]}
      >
        <Sidebar
          username={username}
          handleUnknownProps={handleUnknown}
          logout={handleLogout}
        />
      </Animated.View>
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
  modal: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: "20%",
    left: 0,
    zIndex: 2,
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
