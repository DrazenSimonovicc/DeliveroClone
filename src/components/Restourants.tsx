import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { restaurants } from "../../assets/data/home";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function Restourants() {
  const navigation = useNavigation();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 15 }}
    >
      {restaurants.map((restorant, index) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Details");
          }}
          key={index}
        >
          <View style={styles.categoryCard} key={index}>
            <Image source={restorant.img} style={styles.image} />
            <View style={styles.categoryBox}>
              <Text style={styles.categoryText}>{restorant.name}</Text>
              <Text style={{ color: Colors.green }}>
                {restorant.rating} {restorant.ratings}
              </Text>
              <Text style={{ color: Colors.medium }}>{restorant.distance}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 250,
    backgroundColor: "#fff",
    marginEnd: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  image: {
    flex: 5,
    width: undefined,
    height: undefined,
  },
  categoryText: {
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  categoryBox: {
    flex: 2,
    padding: 10,
  },
});
