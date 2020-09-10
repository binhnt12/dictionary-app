import React, { useState, useRef } from "react";
import { Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SearchComponent from "../components/Search";
import { getSingleWord, getMultipleWord } from "../actions/search";

const Search = () => {
  const [text, onChangeText] = useState("");
  const debounceRef = useRef(null);

  const data = useSelector(state => state.search.data);
  // console.log(JSON.stringify(data.words, null, 2));
  const dispatch = useDispatch();

  const onSearcch = value => {
    onChangeText(value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      getMultipleWord(dispatch, value);
    }, 500);
  };

  const handleSearch = value => {
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

      {data && <SearchComponent data={data} />}
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