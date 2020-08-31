import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getWord } from "../actions/search";

const Search = () => {
  const [text, onChangeText] = useState("");

  const data = useSelector(state => state.search.data) || {
    notFound: null,
    message: "",
    idx: null,
    word: "",
    detail: {
      splitTwo: [],
    },
  };
  // console.log(JSON.stringify(data.detail.splitTwo, null, 2));
  const dispatch = useDispatch();

  const handleSearch = value => {
    getWord(dispatch, value);
  };

  return (
    <ScrollView>
      <TextInput onChangeText={value => onChangeText(value)} value={text} />
      <Button onPress={() => handleSearch(text)} title="Search" />
      {data.notFound ? (
        <Text style={styles.notFound}>{data.message}</Text>
      ) : (
        <View>
          <Text style={styles.spelling}>{data.detail.splitTwo[0]}</Text>
          <Text>
            {data.detail.splitTwo.map(splitTwoLv1 => {
              return (
                typeof splitTwoLv1 === "object" &&
                splitTwoLv1.map((splitTwoLv2, i) => {
                  if (i === 0) {
                    const phrase = splitTwoLv2
                      .slice(
                        splitTwoLv2.indexOf("*"),
                        splitTwoLv2.indexOf("\n"),
                      )
                      .replace("*  ", "");
                    const content = splitTwoLv2
                      .slice(splitTwoLv2.indexOf("\n"))
                      .replace(/\n-/g, "\n\u2023")
                      .replace(/\n=/g, "\n\u25e6");
                    return [
                      <Text key={i} style={styles.phrase}>
                        {phrase}
                      </Text>,
                      <Text key={`content-${i}`}>{content}</Text>,
                    ];
                  } else if (i === 1) {
                    splitTwoLv2 = splitTwoLv2.split("\n!");
                    return [
                      <Text key={`idioms-title`} style={styles.idioms}>
                        {"\n\t"}Idioms
                      </Text>,
                      splitTwoLv2.map((splitTwoLv3, j) => (
                        <Text key={`idioms-${j}`}>
                          {`\n${j + 1}. ${splitTwoLv3
                            .replace(/!/, "")
                            .replace(/\n-/g, "\n\u25e6")
                            .replace(/\n=/g, "\n\t\u2022 ")}`}
                        </Text>
                      )),
                    ];
                  }
                  return (
                    <Text key={`content`}>{splitTwoLv2.replace(/@/g, "")}</Text>
                  );
                })
              );
            })}
          </Text>
        </View>
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
});

export default Search;
