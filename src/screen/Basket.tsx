import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import useBasketStore from "../../Store/basketStore";
import Colors from "../constants/Colors";
import ConfettiCannon from "react-native-confetti-cannon";
import { useNavigation } from "@react-navigation/native";
import GmailStyleSwipeableRow from "../components/Swipable/SwipableRow";

export default function Basket() {
  const { products, total, clearProduct, reduceProduct } = useBasketStore();
  const [order, setOrder] = useState(false);

  const FEES = {
    service: 2.99,
    delivery: 5.99,
  };
  const startCheckout = () => {
    setOrder(true), clearProduct();
  };
  const navigation = useNavigation();

  return (
    <>
      {order && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />}
      {order && (
        <View
          style={{
            marginTop: "50%",
            padding: 20,
            alignItems: "center",
            gap: 20,
          }}
        >
          <Text
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            Thank you for your order!
          </Text>
          <TouchableOpacity
            style={styles.orderBtn}
            onPress={() => navigation.navigate("Index")}
          >
            <Text style={styles.btnTextBottomSheet}>New order!</Text>
          </TouchableOpacity>
        </View>
      )}

      {!order && (
        <>
          <FlatList
            data={products}
            ListHeaderComponent={<Text style={styles.header}>Items :</Text>}
            ListFooterComponent={
              <>
                <View style={{ height: 1, backgroundColor: Colors.gray }} />
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Subtotal</Text>
                  <Text style={styles.totalNum}>${total.toFixed(2)}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Service fee</Text>
                  <Text style={styles.totalNum}>${FEES.service}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Delivery fee</Text>
                  <Text style={styles.totalNum}>${FEES.delivery}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={[styles.total, { fontWeight: "bold" }]}>
                    Order total:
                  </Text>
                  <Text style={styles.totalNumTotal}>
                    ${(FEES.service + FEES.delivery + total).toFixed(2)}
                  </Text>
                </View>
              </>
            }
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.gray }} />
            )}
            renderItem={({ item }) => (
              <GmailStyleSwipeableRow onDelete={() => reduceProduct(item)}>
                <View style={styles.row}>
                  <Text style={{ color: Colors.primary, fontSize: 18 }}>
                    {item.quantity}x
                  </Text>
                  <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
                  <Text style={{ fontSize: 18 }}>
                    $ {item.price * item.quantity}
                  </Text>
                </View>
              </GmailStyleSwipeableRow>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <View style={styles.footer}>
            <View>
              <TouchableOpacity
                style={styles.btnBottomSheet}
                onPress={startCheckout}
              >
                <Text style={styles.btnTextBottomSheet}>Order now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    gap: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    paddingHorizontal: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
  },
  total: {
    color: Colors.medium,
    fontSize: 18,
  },
  totalNum: {
    color: Colors.mediumDark,
    fontSize: 18,
  },
  totalNumTotal: {
    color: Colors.mediumDark,
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
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
    flexDirection: "row",
    justifyContent: "space-around",
  },
  orderBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 50,
  },
});
