import React, { useRef, useState } from "react";
import { View, Switch, Animated, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react/cjs/react.development";
import styled from "styled-components";

import { toggleTheme, toggleHide } from "../actions/setting";
import { COLORS } from "../contants/colors";

const { height, width } = Dimensions.get("window");

const Container = styled.View`
  min-height: ${height}px;
  font-family: Helvetica;
  padding: 20px;
  background-color: ${COLORS.whiteBlue};
`;

const User = styled.View`
  margin-top: 24px;
  flex-direction: row;
`;

const Avatar = styled.View`
  width: 75px;
  height: 75px;
  border-radius: ${75 / 2}px;
  background-color: ${COLORS.blue};
  justify-content: center;
  align-items: center;
`;

const LogoutButton = styled.TouchableOpacity`
  margin-left: 24px;
  border-radius: 90px;
  background-color: ${COLORS.blue};
  padding: 5px;
  justify-content: center;
  align-items: center;
  width: 80px;
  color: ${COLORS.black};
`;

const AvatarText = styled.Text`
  color: ${COLORS.orange};
  font-size: 50px;
`;

const LogoutText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

const Username = styled.Text`
  margin-left: 24px;
  font-size: 20px;
  font-weight: bold;
  text-transform: capitalize;
  color: ${COLORS.black};
`;

const Filter = styled.View`
  margin-top: 48px;
`;

const FilterText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${COLORS.black};
`;

const Line = styled.View`
  margin-top: 4px;
  margin-bottom: 8px;
  width: 100%;
  height: 2px;
  background-color: #e0e0e0;
`;

const FilterOption = styled.TouchableOpacity`
  margin-top: 16px;
  margin-left: 16px;
  flex-direction: row;
`;

const OptionIcon = styled(Icon)`
  color: ${props =>
    props.isUnknown
      ? props.theme.theme === "dark"
        ? COLORS.orange
        : COLORS.blue
      : props.theme.theme === "dark"
      ? "#fff"
      : COLORS.black};
`;

const FilterOptionText = styled.Text`
  font-size: 18px;
  margin-left: 10px;
  color: ${props =>
    props.isUnknown
      ? props.theme.theme === "dark"
        ? COLORS.orange
        : COLORS.blue
      : props.theme.theme === "dark"
      ? "#fff"
      : COLORS.black};
`;

const FilterLine = styled.View`
  margin-left: 16px;
  margin-top: 4px;
  width: 80%;
  height: 4px;
  background-color: ${props =>
    props.isUnknown
      ? props.theme.theme === "dark"
        ? COLORS.orange
        : COLORS.blue
      : "transparent"};
`;

const Setting = styled.View`
  margin-top: 32px;
`;

const SettingOption = styled.View`
  margin-top: 16px;
  margin-left: 16px;
  flex-direction: row;
  width: 80%;
  justify-content: space-between;
`;

const SettingOptionText = styled.Text`
  font-size: 18px;
  color: ${COLORS.black};
`;

const Sidebar = props => {
  const { username, handleUnknownProps, isShowModal } = props;

  const isDarkMode = useSelector(state => state.setting.darkMode);
  const isHide = useSelector(state => state.setting.hide);
  const [isUnknown, setUnknown] = useState(true);
  const [translateX, setTranslateX] = useState(null);
  const isFirstRun = useRef(true);
  let translateValue = new Animated.Value(0);

  const dispatch = useDispatch();

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

  const handleDarkMode = () => {
    toggleTheme(dispatch, !isDarkMode);
  };

  const handleHide = () => {
    toggleHide(dispatch, !isHide);
  };

  const handleUnknown = value => {
    setUnknown(value);
    handleUnknownProps(value);
  };

  const translateModal = translateValue.interpolate({
    inputRange: [0, 1],
    outputRange: isShowModal ? [-width, 0] : [0, -width],
  });

  return (
    <Animated.View
      style={[
        styles.modal,
        {
          transform: [{ translateX: translateX || -width }],
        },
      ]}
    >
      <Container>
        <User>
          <Avatar>
            <AvatarText>{username[0] || "T"}</AvatarText>
          </Avatar>
          <View>
            <Username numberOfLines={2}>{username || "noname"}</Username>
            <LogoutButton>
              <LogoutText onPress={() => props.logout()}>Logout</LogoutText>
            </LogoutButton>
          </View>
        </User>
        <Filter>
          <FilterText>Lọc theo</FilterText>
          <Line />
          <FilterOption onPress={() => handleUnknown(true)}>
            <OptionIcon name="help-circle" size={25} isUnknown={isUnknown} />
            <FilterOptionText isUnknown={isUnknown}>Chưa biết</FilterOptionText>
          </FilterOption>
          <FilterLine isUnknown={isUnknown} />
          <FilterOption onPress={() => handleUnknown(false)}>
            <OptionIcon name="shield-check" size={25} isUnknown={!isUnknown} />
            <FilterOptionText isUnknown={!isUnknown}>Đã biết</FilterOptionText>
          </FilterOption>
          <FilterLine isUnknown={!isUnknown} />
        </Filter>
        <Setting>
          <FilterText>Cài đặt</FilterText>
          <Line />
          <SettingOption>
            <SettingOptionText>Dark Mode</SettingOptionText>
            <Switch
              trackColor={{ false: "#767577", true: "#0672cf" }}
              thumbColor={isDarkMode ? "#fc9f0d" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => handleDarkMode()}
              value={isDarkMode}
            />
          </SettingOption>
          <SettingOption>
            <SettingOptionText>Che nghĩa của từ</SettingOptionText>
            <Switch
              trackColor={{ false: "#767577", true: "#0672cf" }}
              thumbColor={isHide ? "#fc9f0d" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => handleHide()}
              value={isHide}
            />
          </SettingOption>
        </Setting>
      </Container>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: "20%",
    left: 0,
    zIndex: 2,
  },
});

export default Sidebar;
