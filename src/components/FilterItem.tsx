import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { useTheme } from "@react-navigation/native";

type FilterItemProps = {
  isSelected: boolean;
  label: string;
  itemCount: number;
  left?: ReactNode;
};

const FilterItem = ({ isSelected, label, itemCount, left }: FilterItemProps) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.item,
        {
          backgroundColor: isSelected ? colors.text : "transparent",
          borderWidth: isSelected ? 0 : 1,
        },
      ]}
    >
        {!!left && <View style={{marginRight: 4}}>{left}</View>}
      <Text
        style={[
          styles.itemText,
          { color: isSelected ? colors.background : colors.text },
        ]}
      >
        {`${label} (${itemCount})`}
      </Text>
    </View>
  );
};

export default FilterItem;

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
