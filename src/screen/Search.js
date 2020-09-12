import React, { useState, useRef } from "react";
import { Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SearchComponent from "../components/Search";
import { getSingleWord, getMultipleWord } from "../actions/search";

const Search = () => {
  const [text, onChangeText] = useState("");
  const debounceRef = useRef(null);

  const data = useSelector(state => state.search.data);
  const listWord = useSelector(state => state.user.listWord);
  const showSearchComponent = useRef(false);
  // console.log(JSON.stringify(data.words, null, 2));
  const dispatch = useDispatch();

  const isSelected = listWord.findIndex(e => e.word === data.word) !== -1;

  const onSearcch = value => {
    showSearchComponent.current = false;
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
    getSingleWord(dispatch, value);
  };

  return (
    <ScrollView>
      <TextInput onChangeText={value => onSearcch(value)} value={text} />
      <Button onPress={() => handleSearch(text)} title="Search" />
      {data.words &&
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
        <SearchComponent data={data} isSelected={isSelected} />
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
