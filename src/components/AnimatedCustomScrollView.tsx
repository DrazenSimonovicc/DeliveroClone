import {
  ListRenderItem,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import { restaurant } from "../../assets/data/restaurant";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import useBasketStore from "../../Store/basketStore";

export default function ParallaxText() {
  const navigation = useNavigation();
  const DATA = restaurant.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    setActiveIndex(index);
  };

  const { items, total } = useBasketStore();

  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("Dish", { id: item.id })}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.dish}>{item.name}</Text>
        <Text style={styles.dishText}>{item.info}</Text>
        <Text style={styles.dishText}>$ {item.price}</Text>
      </View>

      <Image source={item.img} style={styles.dishImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.stickySegments]}>
        <View style={styles.segmentsShadow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              gap: 10,
            }}
          >
            {DATA.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={
                  activeIndex === index
                    ? styles.segmentBtnActive
                    : styles.segmentBtn
                }
                onPress={() => selectCategory(index)}
              >
                <Text
                  style={
                    activeIndex === index
                      ? styles.segmentBtnTextActive
                      : styles.segmentBtnText
                  }
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>

      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <Text style={styles.restaurantDescription}>
        {restaurant.delivery}{" "}
        {restaurant.tags.map(
          (tag, index) =>
            `${tag}${index < restaurant.tags.length - 1 ? " · " : ""}`
        )}
      </Text>
      <Text style={styles.restaurantDescription}>{restaurant.about}</Text>

      <SectionList
        contentContainerStyle={{ paddingBottom: 50 }}
        keyExtractor={(item, index) => `${item.id + index}`}
        scrollEnabled={false}
        sections={DATA}
        renderSectionHeader={({ section: { index, title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: Colors.gray }} />
        )}
        SectionSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: Colors.gray }} />
        )}
        renderItem={renderItem}
      />
      {items > 0 && (
        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <TouchableOpacity
              style={styles.footerBtn}
              onPress={() => {
                navigation.navigate("Basket");
              }}
            >
              <Text style={styles.basket}>{items}</Text>
              <Text style={styles.footerText}>View basket</Text>
              <Text style={styles.basketTotal}>${total.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  restaurantName: {
    fontSize: 30,
    margin: 16,
  },
  restaurantDescription: {
    fontSize: 16,
    margin: 16,
    lineHeight: 22,
    color: Colors.medium,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    margin: 16,
  },
  item: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
  },
  dishImage: {
    borderRadius: 4,
    width: 80,
    height: 80,
  },
  dish: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dishText: {
    fontSize: 14,
    color: Colors.mediumDark,
    paddingVertical: 4,
  },
  stickySegments: {
    height: 50,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  segmentsShadow: {
    backgroundColor: "#fff",
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  segmentBtn: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentBtnActive: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentBtnTextActive: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  segmentBtnText: {
    color: Colors.primary,
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: 16,
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },

  footerBtn: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    height: 50,
    borderRadius: 20,
  },
  basket: {
    fontSize: 16,
    color: "#fff",
  },
  footerText: {
    fontSize: 16,
    color: "#fff",
  },
  basketTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  footerRow: {
    backgroundColor: "#fff",
  },
});
