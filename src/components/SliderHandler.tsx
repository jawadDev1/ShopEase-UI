import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const SliderHandler = ({ label }: { label: string }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.rangePickerWrapper,
        {  backgroundColor: colors.background },
      ]}
    >
      <View style={styles.rangePicker} />
      <View style={[styles.label, {backgroundColor: colors.card}]}>
        <Text numberOfLines={1} style={{color: colors.text}}>{label}</Text>
      </View>
    </View>
  );
};

export default SliderHandler;

const styles = StyleSheet.create({
  rangePickerWrapper: {
    height: 24,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 2,
    position: 'relative',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    borderColor: '#3b82f6',
  },
  rangePicker: {
    width: 3,
    height: 3,
    borderRadius: 10,
    backgroundColor: '#3b82f6',
  },
  label: {
    position: 'absolute',
    top: 24,
    alignItems: 'center',
    width: 40,
    zIndex: 1000
  },
});
