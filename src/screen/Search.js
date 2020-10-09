import React, { useState, useRef, useMemo } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import SearchComponent from "../components/Search";
import { getSingleWord, getMultipleWord } from "../actions/search";
import { COLORS } from "../contants/colors";
import Message from "../components/Message";
import { MESSAGES } from "../contants/messages";
import { CLEAR_ERROR_WORD, CLEAR_ERROR_SEARCH } from "../contants/actions";

const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
    fontFamily: "Helvetica",
    paddingHorizontal: 20,
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

const SearchContainer = styled.View`
  background-color: #fff;
  border-radius: 90px;
  border-color: ${props => (props.isFocusInput ? COLORS.lightBlue : "#fff")};
  border-style: solid;
  border-width: 1px;
  margin-top: 14px;
  padding-right: 23px;
  padding-left: 23px;
  width: 100%;
  min-height: 46px;
  flex-direction: row;
  align-self: center;
  overflow: hidden;
`;

const SearchInput = styled.TextInput`
  width: 90%;
  font-size: 15px;
  color: #000;
  letter-spacing: -0.24px;
  line-height: 20px;
  padding-right: 20px;
`;

const TextMultipleWord = styled.Text`
  font-size: 15px;
  color: ${props => (props.theme.theme === "dark" ? COLORS.lightBlue : "#000")};
`;

const Search = () => {
  const [text, onChangeText] = useState("");
  const [isFocusInput, setFocusInput] = useState(false);
  const [multiWord, setMultiWord] = useState(true);
  const debounceRef = useRef(null);
  const [showSearchComponent, setShowSearchComponent] = useState(false);

  const data = useSelector(state => state.search.data);
  const listWordUnknown = useSelector(state => state.word.listWord.unknown);
  const listWordKnown = useSelector(state => state.word.listWord.known);
  const refresh = useSelector(state => state.word.refresh);
  const token = !!useSelector(state => state.user.token);
  const errorWord = useSelector(state => state.word.error);
  const errorSearch = useSelector(state => state.search.error);

  const dispatch = useDispatch();

  let radioProps;

  radioProps = useMemo(() => {
    return {
      1:
        listWordUnknown &&
        data &&
        data.idx &&
        listWordUnknown.findIndex(e => e.idx === data.idx) !== -1,
      2:
        listWordKnown &&
        data &&
        data.idx &&
        listWordKnown.findIndex(e => e.idx === data.idx) !== -1,
    };
  }, [listWordUnknown, listWordKnown, showSearchComponent, data, refresh]);

  const onFocus = () => {
    setShowSearchComponent(false);
    setFocusInput(true);
    dispatch({ type: CLEAR_ERROR_WORD });
    dispatch({ type: CLEAR_ERROR_SEARCH });
  };

  const onSearcch = value => {
    setMultiWord(true);

    onChangeText(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      getMultipleWord(dispatch, value);
    }, 500);
  };

  const handleSearch = value => {
    dispatch({ type: CLEAR_ERROR_WORD });
    dispatch({ type: CLEAR_ERROR_SEARCH });
    getSingleWord(dispatch, value)
      .then(res => {
        res && setShowSearchComponent(true);
      })
      .catch(err => console.log(err));
    setMultiWord(false);
  };

  return (
    <Container>
      <Title>Tìm kiếm từ vựng</Title>
      <SearchContainer isFocusInput={isFocusInput}>
        <SearchInput
          autoCapitalize="none"
          onChangeText={value => onSearcch(value)}
          value={text}
          onFocus={() => onFocus()}
          onBlur={() => setFocusInput(false)}
          placeholder="Tìm kiếm"
        />
        <TouchableOpacity
          style={styles.buttonSearch}
          onPress={() => handleSearch(text)}
        >
          <Icon
            style={styles.searchIcon}
            name="magnify"
            size={25}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </SearchContainer>
      {(!!errorSearch || !!errorWord) && (
        <Message type="error">
          {MESSAGES[errorSearch || errorWord].text}
        </Message>
      )}
      <View style={styles.multiWordContainer}>
        {multiWord &&
          data.words &&
          data.words !== [] &&
          data.words.map((o, i) => (
            <TouchableOpacity
              key={`multiple-word-${i}`}
              style={styles.buttonMultipleWord}
              onPress={() => onSearcch(o.word)}
            >
              <TextMultipleWord>{o.word}</TextMultipleWord>
            </TouchableOpacity>
          ))}
      </View>

      {data && showSearchComponent && (
        <ScrollView>
          <SearchComponent
            data={data}
            radioProps={radioProps}
            selector={token}
          />
        </ScrollView>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  notFound: {
    color: "red",
  },
  multiWordContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    marginTop: 10,
  },
  buttonMultipleWord: {
    borderRadius: 90,
    borderColor: "#41CEBB",
    borderWidth: 1,
    borderStyle: "solid",
    paddingHorizontal: 16,
    paddingVertical: 6,
    margin: 5,
  },
  searchIcon: {
    padding: 10,
  },
  buttonSearch: {
    backgroundColor: "#41CEBB",
    width: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Search;
