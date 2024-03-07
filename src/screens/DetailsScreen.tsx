import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import { RootStackScreenProps } from "../../App";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import IconBtn from "../components/IconBtn";
import { StatusBar } from "expo-status-bar";
import BottomSheet from "@gorhom/bottom-sheet";
import Icons from "@expo/vector-icons/MaterialIcons";
import { SIZES } from "../constants";

const DetailsScreen = ({
  navigation,
  route: {
    params: { id, img },
  },
}: RootStackScreenProps<"Details">) => {
  const [productCount, setProductCount] = useState<number>(1);
  const [size, setSize] = useState<string>(SIZES[0]);
  const { colors } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      {/* Background Image */}
      <Image
        source={{
          uri: img || "https://plus.unsplash.com/premium_photo-1661645929465-dff3f6e7041e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8amFja2V0fGVufDB8fDB8fHww",
        }}
        resizeMode="cover"
        style={styles.bgImg}
      />
      <SafeAreaView
        edges={["top"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0 }}
      >
        <StatusBar style={'light'} />
        {/* Header */}
        <View style={styles.header}>
          <IconBtn name={"arrow-back"} onPress={() => navigation.goBack()} />
          <View style={{ flex: 1 }} />
          <IconBtn name={"favorite-border"} />
          <IconBtn name={"add-shopping-cart"} />
        </View>
      </SafeAreaView>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        detached
        snapPoints={[100, 500]}
        index={0}
        bottomInset={insets.bottom + 20}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: colors.background,
        }}
        handleIndicatorStyle= {{ backgroundColor: colors.primary}}
        style={styles.bottomSheet}
      >
        <View style={styles.bottomSheetContainer}>
          <Text style={[styles.productTitle, { color: colors.text }]}>
            PUMA Everyday Hussle
          </Text>
          {/* Rating and counter Row */}
          <View style={styles.row}>
            {/* Rating */}
            <View style={styles.rating}>
              <View style={styles.stars}>
                {new Array(5).fill("").map((_, i) => (
                  <Icons
                    key={i}
                    name={i < 3 ? "star" : "star-border"}
                    size={20}
                    color={"#facc15"}
                  />
                ))}
              </View>
              <Text style={[styles.ratingText, { color: colors.text }]}>
                3.0 (250k Reviews)
              </Text>
            </View>

            {/* Counter */}
            <View
              style={[
                styles.productCounter,
                { backgroundColor: colors.primary },
              ]}
            >
              <TouchableOpacity
                onPress={() => setProductCount(Math.max(1, productCount - 1))}
                style={[styles.counterBtn, { backgroundColor: colors.card }]}
              >
                <Icons name="remove" size={20} color={colors.text} />
              </TouchableOpacity>
              <Text style={[styles.counterText, { color: colors.background }]}>
                {productCount}
              </Text>
              <TouchableOpacity
                onPress={() => setProductCount(Math.min(8, productCount + 1))}
                style={[styles.counterBtn, { backgroundColor: colors.card }]}
              >
                <Icons name="add" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Size Options */}
          <View>
            <View style={styles.sizeRow}>
              <Text style={[styles.modelText, { color: colors.text }]}>
                Model is 6'1, Size M
              </Text>
              <Text style={[styles.sizeGuide, { color: colors.text }]}>
                Size guide
              </Text>
            </View>
            {/* SIZES ROW */}
            <View style={styles.sizes}>
              {SIZES.map((s, i) => (
                <TouchableOpacity
                  onPress={() => setSize(s)}
                  key={i}
                  style={[
                    styles.sizeBtn,
                    {
                      backgroundColor:
                        s === size ? colors.primary : colors.card,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.sizeBtnText,
                      { color: s === size ? colors.card : colors.text },
                    ]}
                  >
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Description */}
          <View>
            <Text style={[styles.descriptionTitle, { color: colors.text }]}>
              Description
            </Text>
            <Text
              style={{ color: colors.text, opacity: 0.75, }}
              numberOfLines={3}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              sed, odit qui aliquid officiis debitis deserunt hic quam facere
              ipsum vitae nesciunt expedita, nostrum asperiores quas fuga nulla.
              Accusamus, sapiente.
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          {/* Add To Cart */}
          <View style={styles.addToCart}>
            <View style={styles.price}>
                    <Text style={{color: colors.text, opacity: 0.75}}>Total</Text>
                    <Text style={[styles.priceText, {color: colors.text}]}>${(2500).toLocaleString()}</Text>
            </View>
            <TouchableOpacity
              style={[styles.addToCartBtn, { backgroundColor: colors.primary }]}
            >
              <Text
                style={[styles.addToCartBtnText, { color: colors.background }]}
              >
                Add to cart
              </Text>
              <View style={[{ backgroundColor: colors.card }, styles.arrow]}>
                <Icons name="arrow-forward" size={24} color={colors.text} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 8,
  },
  bgImg: {
    flex: 1,
  },
  bottomSheet: {
    marginHorizontal: 20,
  },
  bottomSheetContainer: {
    padding: 16,
    gap: 16,
    flex: 1,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  // Rating
  rating: {
    flex: 1,
  },
  ratingText: {
    fontSize: 14,
    opacity: 0.5,
    marginTop: 5,
  },
  stars: {
    flexDirection: "row",
    gap: 2,
  },
  // Product Counter
  productCounter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 6,
    borderRadius: 100,
  },
  counterBtn: {
    width: 34,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 34,
  },
  counterText: {
    fontSize: 16,
    fontWeight: "600",
  },

  // Size Row
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  modelText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  sizeGuide: {
    opacity: 0.5,
  },
  sizes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  sizeBtn: {
    width: 44,
    height: 44,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeBtnText: {
    fontSize: 16,
    fontWeight: "600",
  },

  // Description
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  addToCart: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  // Total Price
  price: {
    flex: 1,
    gap: 4 ,
  },
  total: {},
  priceText: {
    fontWeight: '600',
    fontSize: 18, 
  },
  addToCartBtn: {
    height: 64,
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flexDirection: 'row',
    gap: 16,
    padding: 12,
  },
  addToCartBtnText: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 16,
  },
  arrow: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
