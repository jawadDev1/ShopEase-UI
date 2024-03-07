import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import FilterItem from "./FilterItem";
import { COLORS_FILTER, SLEEVES_FILTER, SPORTS_CATEGORIES } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import PriceRangeSelector from "./PriceRangeSelector";

const MAX_PRICE = 500;

const FilterView = () => {
  const { colors } = useTheme();
  const [startPrice, setStartPrice] = useState<number>(50);
  const [endPrice, setEndPrice] = useState<number>(250);
  const [sportsCategoryIndex, setSportsCategoryIndex] = useState<number>(0);
  const [colorsCategoryIndex, setColorsCategoryIndex] = useState<number>(0);
  const [sleeveCategoryIndex, setSleeveCategoryIndex] = useState<number>(0);

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={[styles.filterText, {color: colors.text}]}>Filters</Text>
        <TouchableOpacity>
          <Text style={{color: colors.text, opacity: 0.5}}>Reset</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1, gap: 24, paddingVertical: 11 }}>
        {/* Price Range Selector */}
        <PriceRangeSelector
          minPrice={0}
          maxPrice={MAX_PRICE}
          startPrice={startPrice}
          endPrice={endPrice}
          onStartPriceChange={setStartPrice}
          onEndPriceChange={setEndPrice}
        />

        {/* Sports Category Filter */}
        <View style={{ paddingHorizontal: 24, flex: 1 }}>
          <Text style={[styles.categoriesText, {color: colors.text}]}>Sports</Text>
          <View style={styles.categoryList}>
            {SPORTS_CATEGORIES.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSportsCategoryIndex(index)}
              >
                <FilterItem
                  label={item.label}
                  itemCount={item.itemCount}
                  isSelected={sportsCategoryIndex === index}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Colors Category Filter */}
        <View style={{ paddingHorizontal: 24 }}>
          <Text style={[styles.categoriesText, {color: colors.text}]}>Color</Text>
          <View style={styles.categoryList}>
            {COLORS_FILTER.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setColorsCategoryIndex(index)}
              >
                <FilterItem
                  label={item.label}
                  itemCount={item.itemCount}
                  isSelected={colorsCategoryIndex === index}
                  left={
                    <View
                      style={{
                        backgroundColor: item.color,
                        width: 12,
                        height: 12,
                        borderRadius: 8,
                      }}
                    />
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sleeves Category Filter */}
        <View style={{ paddingHorizontal: 24, flex: 1 }}>
          <Text style={[styles.categoriesText, {color: colors.text}]}>Sleeves</Text>
          <View style={styles.categoryList}>
            {SLEEVES_FILTER.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSleeveCategoryIndex(index)}
              >
                <FilterItem
                  label={item.label}
                  itemCount={item.itemCount}
                  isSelected={sleeveCategoryIndex === index}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View style={{ padding: 24, paddingBottom: 24 + insets.bottom }}>
        <TouchableOpacity
          style={[styles.applyBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.applyBtnText, { color: colors.background }]}>
            Apply
          </Text>
          <View style={[{ backgroundColor: colors.card }, styles.arrow]}>
            <Icons name="arrow-forward" size={24} color={colors.text} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  filterText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
  },
  //   Sports Category Section
  categoryList: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 11,
  },
  categoriesText: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 12,
  },
  applyBtn: {
    height: 64,
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  applyBtnText: {
    fontSize: 16,
    fontWeight: "600",
  },
  arrow: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 12,
    right: 12,
    bottom: 12,
  },
});
