import React, { useState, useRef, useMemo } from "react";
import {
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import SearchComponent from "../components/Search";
import { getSingleWord, getMultipleWord } from "../actions/search";

const Search = () => {
  const [text, onChangeText] = useState("");
  const [isFocusInput, setFocusInput] = useState(false);
  const [multiWord, setMultiWord] = useState(true);
  const debounceRef = useRef(null);
  const showSearchComponent = useRef(false);

  const data = useSelector(state => state.search.data);
  const listWordUnknown = useSelector(state => state.user.listWord.unknown);
  const listWordKnown = useSelector(state => state.user.listWord.known);
  const token = Boolean(useSelector(state => state.user.token));
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
  }, [listWordUnknown, listWordKnown, showSearchComponent.current, data]);

  console.log("------------------");
  console.log({ radioProps });

  const onFocus = () => {
    showSearchComponent.current = false;
    setFocusInput(true);
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
    showSearchComponent.current = true;
    setMultiWord(false);
    getSingleWord(dispatch, value);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tìm kiếm từ vựng</Text>
      <View
        style={
          isFocusInput ? styles.searchContainerFocus : styles.searchContainer
        }
      >
        <TextInput
          onChangeText={value => onSearcch(value)}
          value={text}
          style={styles.input}
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
      </View>
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
              <Text style={styles.textMultipleWord}>{o.word}</Text>
            </TouchableOpacity>
          ))}
      </View>

      {data && showSearchComponent.current && (
        <ScrollView>
          <SearchComponent
            data={data}
            radioProps={radioProps}
            selector={token}
          />
        </ScrollView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F2",
    fontFamily: "Helvetica",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    color: "#000000",
    fontWeight: "bold",
    width: "100%",
    alignSelf: "center",
    marginTop: 25,
  },
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 5,
  },
  textMultipleWord: {
    fontSize: 18,
  },
  searchContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 90,
    borderColor: "#FFFFFF",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 14,
    paddingRight: 23,
    paddingLeft: 23,
    width: "100%",
    marginHorizontal: 20,
    height: 46,
    flexDirection: "row",
    alignSelf: "center",
    overflow: "hidden",
  },
  searchContainerFocus: {
    backgroundColor: "#FFFFFF",
    borderRadius: 90,
    borderColor: "#41CEBB",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 14,
    paddingRight: 23,
    paddingLeft: 23,
    width: "100%",
    marginHorizontal: 20,
    height: 46,
    flexDirection: "row",
    alignSelf: "center",
    overflow: "hidden",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    width: "90%",
    fontSize: 15,
    color: "#000000",
    letterSpacing: -0.24,
    lineHeight: 20,
    paddingRight: 20,
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
