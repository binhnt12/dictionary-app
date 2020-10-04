import React from "react";
import styled from "styled-components";
import { COLORS } from "../contants/colors";

const Container = styled.Text`
  font-size: 15px;
  color: ${props => (props.type === "error" ? COLORS.red : COLORS.blue)};
  align-self: center;
  margin-top: 16px;
  margin-bottom: 12px;
`;

const Message = props => {
  const { children, type } = props;
  return <Container type={type}>{children}</Container>;
};

export default Message;
