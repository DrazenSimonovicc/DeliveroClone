import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function LocationSearch() {
  const navigation = useNavigation();

  const [location, setLocation] = useState({
    latitude: 43.7246839,
    longitude: 21.365685,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={location} />

      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.btnText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
