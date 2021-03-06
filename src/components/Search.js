import React, { memo, useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useDispatch, useSelector } from "react-redux";
import styled, { ThemeContext } from "styled-components";
import LazyloadView from "./Lazyload/LazyloadView";
import Sound from "react-native-sound";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { addToListWord, removeFromListWord } from "../actions/word";
import { COLORS } from "../contants/colors";

const { width } = Dimensions.get("window");

const Message = styled.Text`
  color: ${COLORS.orange};
`;

const Word = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: ${COLORS.black};
`;

const Spelling = styled.Text`
  font-style: italic;
  font-size: 18px;
  color: ${COLORS.black};
`;

const CheckboxLabel = styled.Text`
  color: ${COLORS.black};
`;

const Phrase = styled.Text`
  color: ${props =>
    props.theme.theme === "dark" ? COLORS.lightBlue : COLORS.blue};
  font-weight: bold;
  font-size: 20px;
  text-transform: capitalize;
  line-height: 30px;
`;

const Content = styled.Text`
  color: ${COLORS.black};
  line-height: 20px;
  font-size: 15px;
`;

const Idioms = styled.Text`
  color: ${COLORS.orange};
  font-weight: bold;
  font-size: 18px;
  font-style: italic;
`;

const ContentIdiom = styled.Text`
  color: ${COLORS.black};
  font-size: 15px;
  line-height: 20px;
`;

const Line = styled.View`
  height: 2px;
  margin-top: 5px;
  background-color: #999;
`;

const Display = styled.TouchableOpacity`
  margin-top: 10px;
`;

const DisplayText = styled.Text`
  color: ${props =>
    props.theme.theme === "dark" ? COLORS.lightBlue : COLORS.blue};
  font-size: 15px;
  text-align: center;
`;

const WordAndSound = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SoundContainer = styled.TouchableOpacity`
  margin-left: 8px;
`;

const SoundIcon = styled(Icon)``;

const Search = props => {
  const { radioProps, data, selector, user } = props;

  const [toggleCheckBox, setToggleCheckBox] = useState(
    radioProps || { 1: false, 2: false },
  );
  const [isHide, setHide] = useState(hide);

  const refresh = useSelector(state => state.word.refresh);
  const token = useSelector(state => state.user.token);
  const hide = useSelector(state => state.setting.hide);
  const dispatch = useDispatch();

  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    setToggleCheckBox(radioProps);
  }, [radioProps, refresh]);

  useEffect(() => {
    setHide(hide);
  }, [hide]);

  if (!data) {
    return null;
  }

  const onSound = () => {
    const word = data.word.replace(/ /g, "+");
    const whoosh = new Sound(
      `http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&q=${word}&tl=En-gb`,
      null,
      error => {
        if (error) {
          console.log("failed to load the sound", error);
          return;
        }
        whoosh.setVolume(0.8);
        whoosh.play();
      },
    );
  };

  const handleCheckBox = i => {
    const temp = { ...toggleCheckBox };
    const j = i === "1" ? "2" : "1";
    if (toggleCheckBox[i]) {
      temp[i] = false;
      setToggleCheckBox(temp);
      if (i === "1") {
        removeFromListWord(dispatch, "unknown", data.idx, token);
      } else {
        removeFromListWord(dispatch, "known", data.idx, token);
      }
    } else {
      const k = temp[j];
      temp[i] = true;
      temp[j] = false;
      setToggleCheckBox(temp);
      if (i === "1") {
        addToListWord(dispatch, "unknown", data, token);
        k && removeFromListWord(dispatch, "known", data.idx, token);
      } else {
        addToListWord(dispatch, "known", data, token);
        k && removeFromListWord(dispatch, "unknown", data.idx, token);
      }
    }
  };

  const removedTags = data.detail.slice(
    data.detail.indexOf("@"),
    data.detail.indexOf("</Q>"),
  );
  const text = removedTags
    .replace(/<br \/>/g, "\n")
    .replace(/\+/g, ":")
    .replace(/&amp;/g, "&");
  // tách thành đoạn dựa trên kí tự * và lấy cả *, split("*") nhưng lấy cả *
  const splitOne = text.split(/(?=\*)/);
  let splitTwo = [];
  splitTwo[0] =
    splitOne[0].slice(
      splitOne[0].indexOf("/"),
      splitOne[0].indexOf("/", splitOne[0].indexOf("/") + 1),
    ) + "/";
  for (let i = 1; i < splitOne.length; i++) {
    splitTwo[i] = splitOne[i].replace(/\n!/, "<br !/>!").split("<br !/>");
  }

  const contentComponent = splitTwo.map(splitTwoLv1 => {
    return (
      typeof splitTwoLv1 === "object" &&
      splitTwoLv1.map((splitTwoLv2, i) => {
        if (i === 0) {
          const phrase = splitTwoLv2
            .slice(splitTwoLv2.indexOf("*"), splitTwoLv2.indexOf("\n"))
            .replace(/(\* {2})|(\* )/, "");

          const content = splitTwoLv2
            .slice(splitTwoLv2.indexOf("\n"))
            .replace(/\n-/g, "\n\u2023")
            .replace(/\n=/g, "\n\u25e6");

          return [
            <Phrase key={i}>{"\n" + phrase}</Phrase>,
            <Content key={`content-${i}`}>{content}</Content>,
          ];
        } else if (i === 1) {
          splitTwoLv2 = splitTwoLv2.split("\n!");

          return [
            <Idioms key={`idioms-title`}>{"\n\t"}Idioms</Idioms>,
            splitTwoLv2.map((splitTwoLv3, j) => (
              <ContentIdiom key={`idioms-${j}`}>
                {`\n${j + 1}. ${splitTwoLv3
                  .replace(/!/, "")
                  .replace(/\n-/g, "\n\u25e6")
                  .replace(/\n=/g, "\n\t\u2022 ")}`}
              </ContentIdiom>
            )),
          ];
        }
        return <Text key={`content`}>{splitTwoLv2.replace(/@/g, "")}</Text>;
      })
    );
  });

  return data ? (
    <LazyloadView
      host={user ? "unique-lazyload-list-name" : null}
      style={user ? styles.slideUser : styles.slide}
    >
      {data.notFound || !data.detail ? (
        <Message>{data.message}</Message>
      ) : (
        <View style={user ? styles.slideTextUser : styles.slideText}>
          <WordAndSound>
            <Word>{data.word}</Word>
            <SoundContainer onPress={() => onSound()}>
              <SoundIcon name="volume-high" size={25} />
            </SoundContainer>
          </WordAndSound>
          {splitTwo[0] !== "/" && <Spelling>{splitTwo[0]}</Spelling>}
          {selector && (
            <View style={styles.checkBoxContainer}>
              <View style={styles.checkBoxInner}>
                <CheckBox
                  tintColors={{
                    true: themeContext.theme === "dark" ? "#41cebb" : "#0672cf",
                  }}
                  value={toggleCheckBox["1"]}
                  onValueChange={() => handleCheckBox("1")}
                />
                <CheckboxLabel>Chưa biết</CheckboxLabel>
              </View>
              <View style={styles.checkBoxInner}>
                <CheckBox
                  tintColors={{
                    true: themeContext.theme === "dark" ? "#41cebb" : "#0672cf",
                  }}
                  value={toggleCheckBox["2"]}
                  onValueChange={() => handleCheckBox("2")}
                />
                <CheckboxLabel>Đã biết</CheckboxLabel>
              </View>
            </View>
          )}
          <Line />
          {user ? (
            isHide ? (
              <Display onPress={() => setHide(false)}>
                <DisplayText>&#9660; Hiện</DisplayText>
              </Display>
            ) : (
              <View>
                <Display onPress={() => setHide(true)}>
                  <DisplayText>&#9650; Ẩn</DisplayText>
                </Display>
                <Text>{contentComponent}</Text>
              </View>
            )
          ) : (
            <Text>{contentComponent}</Text>
          )}
        </View>
      )}
    </LazyloadView>
  ) : null;
};

const styles = StyleSheet.create({
  slide: {
    paddingBottom: 10,
    paddingTop: 10,
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    fontFamily: "Helvetica",
  },
  slideUser: {
    paddingBottom: 10,
    paddingTop: 30,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    fontFamily: "Helvetica",
  },
  slideText: {
    width: "100%",
    textAlign: "left",
    fontSize: 12,
  },
  slideTextUser: {
    width: width - 40,
    textAlign: "left",
    fontSize: 12,
  },
  multipleWord: {
    textDecorationLine: "underline",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  checkBoxContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkBoxInner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default memo(Search);
