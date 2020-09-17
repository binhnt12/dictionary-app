import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import shortid from "shortid";

import { addToListWord } from "../actions/user";

const CreateWord = () => {
  const [word, setWord] = useState("");
  const [selected, setSelected] = useState({ 0: "00" });
  const [input, setInput] = useState({ 0: "" });
  const [array, setArray] = useState([0]);
  const [key, setKey] = useState(0);

  const dispatch = useDispatch();

  const addToArray = () => {
    if (array.length < 10) {
      setArray([...array, array[array.length - 1] + 1 || 0]);
      const i =
        parseInt(Object.keys(selected)[Object.keys(selected).length - 1], 10) +
        1;
      setSelected({ ...selected, [i || 0]: `${i || 0}0` });
      setInput({ ...input, [i || 0]: "" });
    }
  };

  const removeToArray = i => {
    let arrayTemp = [...array];
    arrayTemp.pop();
    setArray(arrayTemp);

    let selectedTemp = selected;
    for (let j in selectedTemp) {
      if (parseInt(j, 10) >= i) {
        const nextValue = selectedTemp[(parseInt(j, 10) + 1).toString()];
        selectedTemp[j] =
          nextValue &&
          (parseInt(nextValue[0], 10) - 1).toString() + nextValue[1];
      }
    }
    delete selectedTemp[
      Object.keys(selectedTemp)[Object.keys(selectedTemp).length - 1]
    ];
    setSelected(selectedTemp);

    let inputTemp = input;
    for (let j in inputTemp) {
      if (parseInt(j, 10) >= i) {
        const nextValue = inputTemp[(parseInt(j, 10) + 1).toString()];
        inputTemp[j] = nextValue;
      }
    }
    delete inputTemp[Object.keys(inputTemp)[Object.keys(inputTemp).length - 1]];
    setInput(inputTemp);

    setKey(key === 0 ? 1 : 0);
  };

  const handleSelected = value => {
    const i = value[0];
    setSelected({ ...selected, [i]: value });
  };

  const handleChange = (text, i) => {
    setInput({ ...input, [i]: text });
  };
  const onCreate = () => {
    let detail = [];
    let data = {};
    for (let i in input) {
      detail[parseInt(i, 10)] = "<br />- " + input[i].replace(/,/g, "<br />-");
      let phrase;
      switch (selected[i][1]) {
        case "0":
          phrase = "không xác định";
          break;
        case "1":
          phrase = "danh từ";
          break;
        case "2":
          phrase = "động từ";
          break;
        case "3":
          phrase = "tính từ";
          break;
        default:
          phrase = "loại từ";
      }
      detail[parseInt(i, 10)] = `<br />* ${phrase}` + detail[parseInt(i, 10)];
    }

    detail = `<C><F><I><N><Q>@${word}${detail.join("")}</Q></N></I></F></C>`;

    if (detail && word) {
      data.detail = detail;
      data.word = word;
      data.idx = shortid.generate();
      data.message = "Success";
      data.notFound = false;
      addToListWord(dispatch, "unknown", data);
    }
  };

  return (
    <View>
      <Text>create word:</Text>
      <TextInput
        style={styles.word}
        placeholder="Nhập từ"
        value={word}
        onChangeText={text => setWord(text)}
      />
      {array.map(i => (
        <View key={i ? `${key}${i}` : `${key}0`} style={styles.field}>
          <Picker
            mode="dropdown"
            style={styles.widthPicker}
            selectedValue={selected[i]}
            onValueChange={handleSelected}
          >
            <Picker.Item label="Loại từ" value={`${i}0`} />
            <Picker.Item label="Danh Từ" value={`${i}1`} />
            <Picker.Item label="Động Từ" value={`${i}2`} />
            <Picker.Item label="Tính Từ" value={`${i}3`} />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Nghĩa của từ"
            value={input[i]}
            onChangeText={text => handleChange(text, i)}
          />
          <TouchableOpacity onPress={() => removeToArray(i)}>
            <Icon name="minus-circle-outline" size={25} />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={() => addToArray()}>
        <Icon name="plus" size={25} />
      </TouchableOpacity>
      <Button title="Create" onPress={() => onCreate()} />
    </View>
  );
};

const styles = StyleSheet.create({
  word: {
    fontSize: 20,
  },
  field: {
    flexDirection: "row",
  },
  widthPicker: {
    flexGrow: 1 / 3,
    width: 80,
  },
  input: {
    flexGrow: 2 / 3,
    fontSize: 16,
  },
});

export default CreateWord;
