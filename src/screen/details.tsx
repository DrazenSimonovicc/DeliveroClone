import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import AnimatedCustomScrollView from "../components/AnimatedCustomScrollView";
import { restaurant } from "../../assets/data/restaurant";
import Colors from "../constants/Colors";

export default function Details() {
  return (
    <>
      <ParallaxScrollView
        backgroundColor="#fff"
        contentBackgroundColor={Colors.lightGray}
        parallaxHeaderHeight={250}
        stickyHeaderHeight={80}
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>{restaurant.name}</Text>
          </View>
        )}
        renderBackground={() => (
          <View>
            <Image source={restaurant.img} style={styles.backgroundImage} />
          </View>
        )}
      >
        <AnimatedCustomScrollView />
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: 300,
  },
  text: {
    fontSize: 24,
  },
  stickySection: {
    marginLeft: 70,
    marginTop: 28, //16 zbog statusBara i 10 da ga spustim jos dole
    justifyContent: "center",
  },
  stickySectionText: {
    fontSize: 20,
    margin: 10,
  },
});
