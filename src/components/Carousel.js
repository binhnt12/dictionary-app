import React, { memo, useMemo } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
// import LazyloadScrollView from "./Lazyload/LazyloadScrollView";
import {ScrollView} from 'react-native-gesture-handler'

import Search from "./Search";

export const Carousel = props => {
  const { items, unknown } = props;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const init = width => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  };

  const getInterval = offset => {
    for (let i = 1; i <= intervals; i++) {
      if (offset < (width / intervals) * i) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
  };

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...styles.bullet,
          opacity: interval === i ? 0.5 : 0.1,
        }}
      >
        &bull;
      </Text>,
    );
  }

  const content = useMemo(
    () =>
      items.map((item, index) => {
        return (
          <Search
            key={index}
            data={item}
            selector
            user
            radioProps={{ 1: unknown, 2: !unknown }}
          />
        );
      }),
    [unknown],
  );

  return (
    <View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...styles.scrollView,
          width: `${100 * intervals}%`,
          flexDirection: "row-reverse",
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={data => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast"
        // name="unique-lazyload-list-name"
      >
        {content}
      </ScrollView>
      <View style={styles.bullets}>{bullets}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsHead: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  container: {
    width: "100%",
    backgroundColor: "#fbfbfb",
    borderColor: "#ebebeb",
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: "#fcfcfc",
    shadowOpacity: 1,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  scrollView: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  bullets: {
    position: "absolute",
    top: 0,
    right: 0,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 20,
  },
});

export default memo(Carousel);
