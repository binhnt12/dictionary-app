import React from "react";
import { Image, View, StyleSheet, Modal } from "react-native";

function Loading({ image, backgroundColor, width, height }) {
  return (
    <Modal transparent>
      <View style={[styles.imgContainer, { backgroundColor }]}>
        <Image source={image} style={{ width, height }} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
