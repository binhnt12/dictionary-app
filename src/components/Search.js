import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useDispatch } from "react-redux";

import { addToListWord, removeFromListWord } from "../actions/user";

const { width } = Dimensions.get("window");

const Search = props => {
  const { isSelected, data, selector } = props;

  const [isSelectedState, setSelectionState] = useState(isSelected);

  const dispatch = useDispatch();

  if (!data) {
    return null;
  }

  const handleSelection = value => {
    setSelectionState(value);
    if (value) {
      addToListWord(dispatch, data);
    } else {
      removeFromListWord(dispatch, data.word);
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

  return data ? (
    <View style={styles.slide}>
      {data.notFound || !data.detail ? (
        <Text style={styles.notFound}>{data.message || "not data"}</Text>
      ) : (
        <View style={styles.slideText}>
          {selector && (
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isSelectedState}
                onValueChange={handleSelection}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Thêm vào list từ vựng</Text>
            </View>
          )}
          <Text style={styles.word}>{data.word}</Text>
          {splitTwo[0] !== "/" && (
            <Text style={styles.spelling}>{splitTwo[0]}</Text>
          )}
          <Text>
            {splitTwo.map(splitTwoLv1 => {
              return (
                typeof splitTwoLv1 === "object" &&
                splitTwoLv1.map((splitTwoLv2, i) => {
                  if (i === 0) {
                    const phrase = splitTwoLv2
                      .slice(
                        splitTwoLv2.indexOf("*"),
                        splitTwoLv2.indexOf("\n"),
                      )
                      .replace(/(\* {2})|(\* )/, "");

                    const content = splitTwoLv2
                      .slice(splitTwoLv2.indexOf("\n"))
                      .replace(/\n-/g, "\n\u2023")
                      .replace(/\n=/g, "\n\u25e6");

                    return [
                      <Text key={i} style={styles.phrase}>
                        {phrase}
                      </Text>,
                      <Text key={`content-${i}`} style={styles.content}>
                        {content}
                      </Text>,
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
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    flexBasis: "100%",
    flex: 1,
    width: width - 20,
    display: "flex",
    flexDirection: "row",
  },
  slideText: {
    width: "100%",
    textAlign: "left",
    fontSize: 12,
  },
  spelling: {
    textAlign: "center",
  },
  phrase: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
  },
  content: {
    textTransform: "capitalize",
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
  checkboxContainer: {
    flexDirection: "row",
    // marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default Search;
