import { StyleSheet, Text,  View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@react-navigation/native";
import CartCard from "../components/CartCard";
import { PRODUCTS } from "../constants";

const CartScreen = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      edges={["bottom", "top"]}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={styles.heading}>My Cart</Text>

    <CartCard title={PRODUCTS[0].title} price={PRODUCTS[0].price} imgUrl={PRODUCTS[0].price}/>
    <CartCard title={PRODUCTS[1].title} price={PRODUCTS[1].price} imgUrl={PRODUCTS[1].price}/>

    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 27,
    color: "#fff",
    fontWeight: "700",
  },
  container: {
    padding: 15,
  },
 
});
