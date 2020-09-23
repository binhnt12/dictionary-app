import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

const DarkThemeProvider = ({ children }) => {
  const darkMode = useSelector(state => state.setting.darkMode);
  return (
    <ThemeProvider theme={{ theme: darkMode ? "dark" : "light" }}>
      {children}
    </ThemeProvider>
  );
};

export default DarkThemeProvider;
