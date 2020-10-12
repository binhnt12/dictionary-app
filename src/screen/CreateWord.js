import React, { useState, useContext, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { ThemeContext } from "styled-components";
import shortid from "shortid";

import { addToListWord } from "../actions/word";
import Message from "../components/Message";
import { COLORS } from "../contants/colors";
import { MESSAGES } from "../contants/messages";
import { useFocusEffect } from "@react-navigation/native";
import { REFRESH_WORD } from "../contants/actions";

const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
})`
  background-color: ${COLORS.whiteBlue};
`;

const Title = styled.Text`
  font-size: 25px;
  color: ${COLORS.black};
  font-weight: bold;
  width: 100%;
  align-self: center;
  margin-top: 25px;
`;

const Word = styled.TextInput`
  background-color: #fff;
  border-radius: 90px;
  border-color: ${props => (props.isFocusWord ? COLORS.blue : "#fff")};
  border-style: solid;
  border-width: 1px;
  margin-top: 14px;
  padding-right: 23px;
  padding-left: 23px;
  width: 100%;
  min-height: 46px;
  flex-direction: row;
  align-self: center;
  font-size: 15px;
  color: #000;
  letter-spacing: -0.24px;
  line-height: 20px;
`;

const WordDefinition = styled.View`
  border-radius: 4px;
  overflow: hidden;
  border-style: solid;
  border-color: ${COLORS.blue};
  border-width: ${props => (props.theme.theme === "dark" ? "1px" : 0)};
`;

const TextArea = styled.View`
  background-color: ${COLORS.white};
  display: ${props => (props.selected ? "flex" : "none")};
  padding: 15px;
`;

const Input = styled.TextInput`
  color: ${COLORS.black};
  font-size: 15px;
  padding: 0;
`;

const Option = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Phrase = styled.TouchableOpacity`
  padding: 10px 10px;
  width: 25%;
  background-color: ${COLORS.blue};
  border-bottom-color: ${props =>
    props.selected ? COLORS.orange : COLORS.blue};
  border-bottom-width: 2px;
  border-style: solid;
  align-items: center;
`;

const PhraseText = styled.Text`
  color: #fff;
  font-size: 15px;
`;

const CreateButton = styled.TouchableOpacity`
  background-color: ${COLORS.blue};
  border-radius: 90px;
  width: 100%;
  height: 46px;
  padding-right: 23px;
  padding-left: 23px;
  margin-top: 36px;
  elevation: 1;
  justify-content: center;
`;

const CreateButtonText = styled.Text`
  font-size: 15px;
  color: #fff;
  letter-spacing: -0.24px;
  text-align: center;
  line-height: 20px;
  font-weight: bold;
`;

const listPhrase = ["Danh Từ", "Động Từ", "Tính Từ", "Khác"];

const CreateWord = () => {
  const [word, setWord] = useState("");
  const [detailValue, setDetailValue] = useState("");
  const [isFocusWord, setFocusWord] = useState(false);
  const [selected, setSelected] = useState(0);
  const [input, setInput] = useState({ 0: "", 1: "", 2: "", 3: "" });
  const [message, setMessage] = useState("n0");
  const [refresh, setRefresh] = useState(false);

  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  const themeContext = useContext(ThemeContext);

  useFocusEffect(
    useCallback(() => {
      dispatch({ type: REFRESH_WORD });

      return () => {};
    }, [refresh]),
  );

  useEffect(() => {
    setMessage("n0");
  }, [token]);

  const focusWord = () => {
    setFocusWord(true);
    setMessage("n0");
  };

  const handleChange = (text, i) => {
    setInput({ ...input, [i]: text });
  };

  const onCreate = () => {
    if (!token) {
      setMessage("e3");
      return;
    }

    let detail = [];
    let data = {};
    for (let i in input) {
      if (input[i]) {
        detail[i] = "<br />- " + input[i].replace(/\n/g, "<br />- ");
        let phrase;
        switch (i) {
          case "0":
            phrase = "danh từ";
            break;
          case "1":
            phrase = "động từ";
            break;
          case "2":
            phrase = "tính từ";
            break;
          case "3":
            phrase = "khác";
            break;
          default:
            phrase = "khác";
        }
        detail[i] = `<br />* ${phrase}` + detail[i];
      }
    }

    if (detail.length > 0) {
      detail = `<C><F><I><N><Q>@${word}${detail.join("")}</Q></N></I></F></C>`;
      setDetailValue(detail);
    }

    if (detail.length === 0) {
      setMessage("e1");
    }
    if (!word) {
      setMessage("e2");
    }

    if (detail.length > 0 && word) {
      data.detail = detail;
      data.word = word;
      data.idx = shortid.generate();
      data.message = "Success";
      data.notFound = false;
      addToListWord(dispatch, "unknown", data, token, err => {
        if (err) {
          setMessage("e0");
        } else {
          setMessage("s0");
          setRefresh(!refresh);
        }
      });
    }
  };

  return (
    <Container>
      <Title>Tạo từ mới</Title>
      <Word
        autoCapitalize="none"
        placeholder="Nhập từ"
        value={word}
        onChangeText={text => setWord(text)}
        onFocus={() => focusWord(true)}
        onBlur={() => setFocusWord(false)}
        isFocusWord={isFocusWord}
      />
      <Message type={MESSAGES[message].type}>{MESSAGES[message].text}</Message>
      <WordDefinition>
        <Option>
          {listPhrase.map((o, i) => (
            <Phrase
              key={`phrase ${i}`}
              selected={selected === i}
              onPress={() => setSelected(i)}
            >
              <PhraseText>{o}</PhraseText>
            </Phrase>
          ))}
        </Option>
        {[0, 1, 2, 3].map(i => (
          <TextArea key={`text ${i}`} selected={selected === i}>
            <Input
              multiline={true}
              numberOfLines={11}
              textAlignVertical="top"
              placeholderTextColor={
                themeContext.theme === "dark" ? "#fafafa" : "#999"
              }
              placeholder={
                selected === 0
                  ? "Nghĩa của từ, phân cách bằng cách xuống dòng"
                  : null
              }
              value={input[i]}
              onFocus={() => detailValue && setMessage("n0")}
              onChangeText={text => handleChange(text, i)}
            />
          </TextArea>
        ))}
      </WordDefinition>
      <CreateButton onPress={() => onCreate()}>
        <CreateButtonText>Tạo mới</CreateButtonText>
      </CreateButton>
    </Container>
  );
};

export default CreateWord;
