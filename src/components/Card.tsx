import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

type CardProps = {
  imgUrl: string;
  onPress?: () => void;
};

const Card = ({ imgUrl, onPress }: CardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        source={{ uri: imgUrl }}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.price}>
        <Text style={styles.priceText}>$120</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    borderRadius: 20,
  },
  price: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 16,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
});
