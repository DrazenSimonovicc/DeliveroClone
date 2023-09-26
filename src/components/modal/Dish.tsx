import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useRoute } from "@react-navigation/native";
import { getDishById } from "../../../assets/data/restaurant";
import Animated, { FadeInLeft, FadeIn } from "react-native-reanimated";
import useBasketStore from "../../../Store/basketStore";

export default function Dish() {
  const route = useRoute();
  const { id } = route.params;
  const item = getDishById(+id);
  const { addProduct } = useBasketStore();

  const addToCart = () => {
    addProduct(item);
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={item.img}
        style={styles.img}
        entering={FadeIn.duration(500).delay(200)}
      />

      <View style={{ padding: 20 }}>
        <Animated.Text
          entering={FadeInLeft.duration(500).delay(200)}
          style={styles.name}
        >
          {item?.name}
        </Animated.Text>

        <Animated.Text
          entering={FadeInLeft.duration(500).delay(400)}
          style={styles.info}
        >
          {item?.info}
        </Animated.Text>
      </View>

      <View style={styles.footer}>
        <View>
          <TouchableOpacity style={styles.btnBottomSheet} onPress={addToCart}>
            <Text style={styles.btnTextBottomSheet}>Add for ${item.price}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flex: 1,
    backgroundColor: Colors.lightGray,
  },

  img: {
    width: "100%",
    height: 300,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  info: {
    fontSize: 16,
    color: Colors.mediumDark,
  },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },

  btnTextBottomSheet: {
    color: "#fff",
    fontWeight: "bold",
  },

  btnBottomSheet: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 20,
    margin: 16,
    alignItems: "center",
  },
});
