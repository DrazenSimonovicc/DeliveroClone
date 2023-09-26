import React from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const SearchBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchSection}>
        <View style={styles.searchField}>
          <Ionicons
            style={styles.searchIcon}
            name="ios-search"
            size={20}
            color={Colors.medium}
          />
          <TextInput
            placeholder="Restaurants, groceries, dishes"
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            navigation.navigate("Filter");
          }}
        >
          <Ionicons name="options-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: 60,
    backgroundColor: "#fff",
  },
  searchSection: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  input: {
    padding: 10,
    color: Colors.mediumDark,
    flex: 1,
  },
  searchField: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  optionButton: {
    padding: 10,
    borderRadius: 50,
  },
  searchIcon: { paddingLeft: 10 },
});

export default SearchBar;
