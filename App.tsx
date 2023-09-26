import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Index from "./src/screen/Index";
import { NavigationContainer, useNavigation } from "@react-navigation/native"; // Import useNavigation from NavigationContainer
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomHeader from "./src/components/CustomHeader";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Filter from "./src/components/modal/Filter";
import Colors from "./src/constants/Colors";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LocationSearch from "./src/screen/LocationSearch";
import Details from "./src/screen/details";
import { View, StyleSheet } from "react-native";
import Dish from "./src/components/modal/Dish";
import Basket from "./src/screen/Basket";

export type StackParamList = {
  Index: undefined;
  Filter: undefined;
  LocationSearch: undefined;
  Details: undefined;
  Dish: undefined;
  Basket: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <BottomSheetModalProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Index"
              component={Index}
              options={{
                headerShown: false,
                header: () => <CustomHeader />,
              }}
            />
            <Stack.Screen
              name="Filter"
              component={Filter}
              options={{
                presentation: "containedTransparentModal",
                headerShadowVisible: false,
                title: "Filters",
                headerStyle: {
                  backgroundColor: Colors.lightGray,
                },
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                headerTitleAlign: "center",
                headerLeft: () => {
                  const navigation = useNavigation();
                  return (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons name="close" size={28} color={Colors.primary} />
                    </TouchableOpacity>
                  );
                },
              }}
            />
            <Stack.Screen
              name="LocationSearch"
              component={LocationSearch}
              options={{
                headerShadowVisible: false,
                title: "Search Location",
                headerStyle: {
                  backgroundColor: Colors.lightGray,
                },
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                headerTitleAlign: "center",
                headerLeft: () => {
                  const navigation = useNavigation();
                  return (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons name="close" size={28} color={Colors.primary} />
                    </TouchableOpacity>
                  );
                },
              }}
            />
            <Stack.Screen
              name="Details"
              component={Details}
              options={{
                headerShadowVisible: false,
                title: "",
                headerTransparent: true,

                headerLeft: () => {
                  const navigation = useNavigation();
                  return (
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={styles.iconBox}
                    >
                      <Ionicons
                        name="arrow-back"
                        size={28}
                        color={Colors.primary}
                      />
                    </TouchableOpacity>
                  );
                },

                headerRight: () => {
                  const navigation = useNavigation();
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.iconBox}
                      >
                        <Ionicons
                          name="share-outline"
                          size={28}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.iconBox}
                      >
                        <Ionicons
                          name="search-outline"
                          size={28}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                },
              }}
            />
            <Stack.Screen
              name="Dish"
              component={Dish}
              options={{
                presentation: "containedTransparentModal",
                headerShadowVisible: false,
                title: "",
                headerTransparent: true,
                headerLeft: () => {
                  const navigation = useNavigation();
                  return (
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={styles.iconBox}
                    >
                      <Ionicons name="close" size={28} color={Colors.primary} />
                    </TouchableOpacity>
                  );
                },
              }}
            />
            <Stack.Screen
              name="Basket"
              component={Basket}
              options={{
                headerShadowVisible: false,
                title: "Basket",
                headerStyle: {
                  backgroundColor: Colors.lightGray,
                },
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                headerTitleAlign: "center",
                headerLeft: () => {
                  const navigation = useNavigation();
                  return (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons name="close" size={28} color={Colors.primary} />
                    </TouchableOpacity>
                  );
                },
              }}
            />
          </Stack.Navigator>
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  iconBox: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});
