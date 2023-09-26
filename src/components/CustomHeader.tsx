import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useRef, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import SearchBar from "./SearchBar";
import { useNavigation } from "@react-navigation/native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

export default function CustomHeader() {
  const navigaton = useNavigation();
  //ovo je pravljenje bottomsheeta
  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["50%"];

  function handlePressModal() {
    bottomSheetModalRef.current.present();
  }
  //da zatamni ono sto je van njega
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  //da se napravi dugme sto gasi
  const handleClosePress = () => bottomSheetModalRef.current.close();

  return (
    //da komponenta u sebi ima taj bottom modal provider
    <BottomSheetModalProvider>
      <BottomSheetModal
        backgroundStyle={{ backgroundColor: Colors.lightGray }}
        overDragResistanceFactor={0}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomModal}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.bottomSheetContent}>
          <View style={styles.toggle}>
            <TouchableOpacity style={styles.toggleActive}>
              <Text style={styles.activeText}>Delivery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toggleInactive}>
              <Text style={styles.inactiveText}>Pickup</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subheader}>Your location</Text>

          <TouchableOpacity
            onPress={() => {
              navigaton.navigate("LocationSearch");
            }}
          >
            <View style={styles.item}>
              <Ionicons
                name="location-outline"
                size={20}
                color={Colors.medium}
              />
              <Text style={styles.itemText}>Current location</Text>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
          </TouchableOpacity>

          <Text style={styles.subheader}>Arrival Time</Text>

          <TouchableOpacity>
            <View style={styles.item}>
              <Ionicons
                name="stopwatch-outline"
                size={20}
                color={Colors.medium}
              />
              <Text style={styles.itemText}>Now</Text>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleClosePress}
            style={styles.btnBottomSheet}
          >
            <Text style={styles.btnTextBottomSheet}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePressModal}>
          <Image source={require("../../assets/bike.png")} style={styles.img} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={handlePressModal}
        >
          <Text style={styles.title}>Delivery Now</Text>
          <View style={styles.locationName}>
            <Text style={styles.subtitle}>London</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
  },
  bottomModal: {
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 32,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    padding: 8,
    paddingHorizontal: 30,
    borderRadius: 32,
  },
  activeText: {
    color: "#fff",
    fontWeight: "700",
  },
  toggleInactive: {
    padding: 8,
    paddingHorizontal: 30,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  inactiveText: {
    color: Colors.primary,
  },
  container: {
    flexDirection: "row",
    gap: 20,
    height: 60,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  img: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 100,
    resizeMode: "center",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: Colors.medium,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileButton: {
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 50,
  },
  locationName: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    height: 60,
    backgroundColor: "#ffff",
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
  searchIcon: {
    paddingLeft: 10,
  },
  subheader: {
    fontSize: 16,
    fontWeight: "600",
    margin: 16,
  },
  item: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: Colors.gray,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 10,
  },
  itemText: {
    flex: 1,
  },
});
