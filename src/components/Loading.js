import React from "react";
import { Image, View, StyleSheet, Modal } from "react-native";

import ImgLoading from "../images/Spin-1s-200px.gif";

function Loading() {
  return (
    <Modal transparent>
      <View style={styles.imgContainer}>
        <Image source={ImgLoading} style={styles.img} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    opacity: 0.5,
  },
  img: {
    width: 100,
    height: 100,
  },
});

export default Loading;
