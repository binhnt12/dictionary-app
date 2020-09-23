import React, { useState } from "react";
import { View, Switch, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { toggleTheme } from "../actions/setting";
import { COLORS } from "../contants/colors";

const { height } = Dimensions.get("window");

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
  const { username, handleUnknownProps } = props;

  const [isUnknown, setUnknown] = useState(true);
  const [isEnabled, setEnabled] = useState(false);

  const dispatch = useDispatch();

  const handleSwitch = () => {
    toggleTheme(dispatch, !isEnabled);
    setEnabled(!isEnabled);
  };

  const handleUnknown = value => {
    setUnknown(value);
    handleUnknownProps(value);
  };

  return (
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
            thumbColor={isEnabled ? "#fc9f0d" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => handleSwitch()}
            value={isEnabled}
          />
        </SettingOption>
      </Setting>
    </Container>
  );
};

export default Sidebar;
