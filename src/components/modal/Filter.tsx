import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { category } from "../../../assets/data/filter";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

const ItemBox = () => {
  return (
    <>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
          <Text style={styles.itemText}>Sort</Text>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
          <Text style={styles.itemText}>Hygiene rating</Text>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
          <Text style={styles.itemText}>Offers</Text>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
          <Text style={styles.itemText}>Dietary</Text>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Categories</Text>
    </>
  );
};

export default function Filter() {
  const navigation = useNavigation();
  const [items, setItems] = useState<Category[]>(category);
  const [selected, setSelected] = useState<Category[]>([]);
  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);
  const gap = useSharedValue(0);

  const handleClearAll = () => {
    const updateItems = items.map((item) => {
      item.checked = false;
      return item;
    });

    setItems(updateItems);
  };

  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;

    if (hasSelected !== newSelected) {
      flexWidth.value = withTiming(newSelected ? 150 : 0);
      scale.value = withTiming(newSelected ? 1 : 0);
      gap.value = withTiming(newSelected ? 12 : 0);
    }

    setSelected(selectedItems);
  }, [items]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
      opacity: flexWidth.value > 0 ? 1 : 0,
    };
  });

  const animatedGap = useAnimatedStyle(() => {
    return {
      marginLeft: gap.value,
    };
  });

  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const renderItem = ({ item, index }: { item: Category; index: number }) => {
    return (
      <View style={styles.row}>
        <Text>
          {item.name} ({item.count})
        </Text>

        <BouncyCheckbox
          size={25}
          fillColor={Colors.primary}
          unfillColor="#fff"
          iconStyle={{ borderColor: Colors.primary }}
          innerIconStyle={{ borderWidth: 2 }}
          isChecked={items[index].checked}
          onPress={() => {
            const isChecked = items[index].checked;
            const updatedItems = items.map((item) => {
              if (item.name === items[index].name) {
                item.checked = !isChecked;
              }
              return item;
            });
            setItems(updatedItems);
          }}
          disableBuiltInState
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        ListHeaderComponent={<ItemBox />}
      />

      <View style={{ height: 80 }} />

      <View style={styles.footer}>
        <View style={styles.btnContainer}>
          <Animated.View style={[animatedStyle, styles.outlinedButton]}>
            <TouchableOpacity onPress={handleClearAll}>
              <Animated.Text style={[animatedText, styles.outlinedButtonText]}>
                Clear All
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[animatedGap, styles.fullButton]}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGray,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },

  fullButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    flex: 1,
    height: 56,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  outlinedButton: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    height: 56,
  },

  outlinedButtonText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },

  itemContainer: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },

  header: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: "bold",
  },

  item: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: Colors.gray,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },

  itemText: {
    flex: 1,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
