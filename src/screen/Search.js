import React, { useState, useRef, useEffect } from "react";
import { Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SearchComponent from "../components/Search";
import { getSingleWord, getMultipleWord } from "../actions/search";

const Search = () => {
  const [text, onChangeText] = useState("");
  const [key, setKey] = useState(0);
  const [multiWord, setMultiWord] = useState(true);
  const debounceRef = useRef(null);
  const showSearchComponent = useRef(false);

  const data = useSelector(state => state.search.data);
  const listWordUnknown = useSelector(state => state.user.listWord.unknown);
  const listWordKnown = useSelector(state => state.user.listWord.known);
  const token = Boolean(useSelector(state => state.user.token));
  const dispatch = useDispatch();

  let radioProps = {
    1:
      listWordUnknown &&
      listWordUnknown.findIndex(e => e.word === data.word) !== -1,
    2:
      listWordKnown &&
      listWordKnown.findIndex(e => e.word === data.word) !== -1,
  };

  useEffect(() => {
    setKey(key === 0 ? 1 : 0);
  }, []);

  const onSearcch = value => {
    showSearchComponent.current = false;
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
    showSearchComponent.current = true;
    setMultiWord(false);
    getSingleWord(dispatch, value);
  };

  return (
    <ScrollView>
      <TextInput onChangeText={value => onSearcch(value)} value={text} />
      <Button onPress={() => handleSearch(text)} title="Search" />
      {multiWord &&
        data.words &&
        data.words !== [] &&
        data.words.map((o, i) => (
          <Text
            key={`multiple-word-${i}`}
            style={styles.multipleWord}
            onPress={() => onSearcch(o.word)}
          >
            {o.word}
          </Text>
        ))}

      {data && showSearchComponent.current && (
        <SearchComponent
          key={key}
          data={data}
          radioProps={radioProps}
          selector={token}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  spelling: {
    textAlign: "center",
  },
  phrase: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
  },
  idioms: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
    fontStyle: "italic",
  },
  notFound: {
    color: "red",
  },
  word: {
    textAlign: "center",
  },
  multipleWord: {
    textDecorationLine: "underline",
  },
});

export default Search;
