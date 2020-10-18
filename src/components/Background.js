import React from "react";
import { Image, StyleSheet, Dimensions, Modal } from "react-native";

const { width, height } = Dimensions.get("window");
const imgArray = [
  require("../images/steam_community_1.jpeg"),
  require("../images/steam_community_2.jpeg"),
  require("../images/steam_community_3.jpeg"),
  require("../images/steam_community_4.jpeg"),
  require("../images/steam_community_5.jpeg"),
  require("../images/steam_community_6.jpeg"),
  require("../images/steam_community_7.jpeg"),
];

let img = imgArray[Math.floor(Math.random() * 7)];

function Background({ image, createWord }) {
  return (
    <Modal style={styles.imgContainer}>
      <Image source={image || img} style={styles.img} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  img: {
    width: width,
    height: height,
  },
});

export default Background;
