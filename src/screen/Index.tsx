import "react-native-gesture-handler";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import CustomHeader from "../components/CustomHeader";
import Categories from "../components/Categories";
import Restaurants from "../components/Restourants";
import Colors from "../constants/Colors";

export default function Index() {
  return (
    <View style={styles.droidSafeArea}>
      <CustomHeader />
      <ScrollView style={{ zIndex: -1 }}>
        <Categories />
        <Text style={styles.header}>Top picks in your neighborhood!</Text>
        <Restaurants />
        <Text style={styles.header}>Offers near you!</Text>
        <Restaurants />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    paddingHorizontal: 16,
  },
});
