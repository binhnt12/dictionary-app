import React, { memo, useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
// import { Radio } from "native-base";
import CheckBox from "@react-native-community/checkbox";
import { useDispatch } from "react-redux";

import { addToListWord, removeFromListWord } from "../actions/user";

const { width } = Dimensions.get("window");

const Search = props => {
  const { radioProps, data, selector } = props;

  const [toggleCheckBox, setToggleCheckBox] = useState({ 1: false, 2: false });

  const dispatch = useDispatch();

  useEffect(() => {
    setToggleCheckBox(radioProps);
  }, [radioProps]);

  console.log("hehe", radioProps);

  if (!data) {
    return null;
  }

  const handleCheckBox = i => {
    console.log(i);
    const temp = { ...toggleCheckBox };
    const j = i === "1" ? "2" : "1";
    if (toggleCheckBox[i]) {
      temp[i] = false;
      setToggleCheckBox(temp);
      if (i === "1") {
        removeFromListWord(dispatch, "unknown", data.idx);
      } else {
        removeFromListWord(dispatch, "known", data.idx);
      }
    } else {
      const k = temp[j];
      temp[i] = true;
      temp[j] = false;
      setToggleCheckBox(temp);
      if (i === "1") {
        addToListWord(dispatch, "unknown", data);
        k && removeFromListWord(dispatch, "known", data.idx);
      } else {
        addToListWord(dispatch, "known", data);
        k && removeFromListWord(dispatch, "unknown", data.idx);
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

  return data ? (
    <View style={styles.slide}>
      {data.notFound || !data.detail ? (
        <Text style={styles.notFound}>{data.message || "not data"}</Text>
      ) : (
        <View style={styles.slideText}>
          <Text style={styles.word}>{data.word}</Text>
          {splitTwo[0] !== "/" && (
            <Text style={styles.spelling}>{splitTwo[0]}</Text>
          )}
          <View style={styles.line} />
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBox}>
              <CheckBox
                value={toggleCheckBox["1"]}
                onValueChange={() => handleCheckBox("1")}
              />
              <Text style={styles.checkboxLabel}>Chưa biết</Text>
            </View>
            <View style={styles.checkBox}>
              <CheckBox
                value={toggleCheckBox["2"]}
                onValueChange={() => handleCheckBox("2")}
              />
              <Text style={styles.checkboxLabel}>Đã biết</Text>
            </View>
          </View>
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
                        {"\n" + phrase}
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
                        <Text key={`idioms-${j}`} style={styles.contentIdiom}>
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
    // paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
    flexBasis: "100%",
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    fontFamily: "Helvetica",
  },
  slideText: {
    width: "100%",
    textAlign: "left",
    fontSize: 12,
  },
  spelling: {
    fontStyle: "italic",
    fontSize: 18,
  },
  line: {
    width: "100%",
    height: 2,
    marginTop: 5,
    backgroundColor: "#e0e0e0",
  },
  phrase: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 20,
    textTransform: "capitalize",
    lineHeight: 30,
  },
  content: {
    lineHeight: 20,
    fontSize: 15,
  },
  idioms: {
    color: "#fc9f0d",
    fontWeight: "bold",
    fontSize: 18,
    fontStyle: "italic",
  },
  contentIdiom: {
    fontSize: 15,
    lineHeight: 20,
  },
  notFound: {
    color: "red",
  },
  word: {
    fontWeight: "bold",
    fontSize: 20,
  },
  multipleWord: {
    textDecorationLine: "underline",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  checkBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default memo(Search);
