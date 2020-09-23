import { useSelector } from "react-redux";

const useColor = () => {
  const darkMode = useSelector(state => state.setting.darkMode);

  console.log(darkMode);

  return darkMode
    ? {
        COLORS: {
          white: "#37474f",
          whiteBlue: "#37474f",
          black: "#FFFFFF",
          blue: "#0672cf",
          lightBlue: "#41cebb",
          orange: "#fc9f0d",
        },
      }
    : {
        COLORS: {
          white: "#FFFFFF",
          whiteBlue: "#F5F5F2",
          black: "#000000",
          blue: "#0672cf",
          lightBlue: "#41cebb",
          orange: "#fc9f0d",
        },
      };
};

export default useColor;
