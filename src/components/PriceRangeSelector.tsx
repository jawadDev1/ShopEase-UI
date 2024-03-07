import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@react-navigation/native";
import SliderHandler from "./SliderHandler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  GestureDetector,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

type PriceRangeSelectorProps = {
  minPrice: number;
  maxPrice: number;
  startPrice: number;
  endPrice: number;
  onStartPriceChange: (value: number) => void;
  onEndPriceChange: (value: number) => void;
};

const PriceRangeSelector = ({
  minPrice,
  maxPrice,
  startPrice,
  endPrice,
  onStartPriceChange,
  onEndPriceChange,
}: PriceRangeSelectorProps) => {
  const { colors } = useTheme();
  const [barWidth, setBarWidth] = useState(0);
  const leftHandlePos = useSharedValue(0);
  const rightHandlePos = useSharedValue(0);

  const startHangleGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { prevPos: number }
  >({
    onStart(eventPayload, context, isCanceledOrFailed) {
      context.prevPos = leftHandlePos.value;
    },
    onActive(eventPayload, context) {
      leftHandlePos.value = Math.min(
        rightHandlePos.value,
        Math.max(0, context.prevPos + eventPayload.translationX)
      );
      runOnJS(onStartPriceChange)(
        Math.round((maxPrice / barWidth) * leftHandlePos.value)
      );
    },
  });

  const endHangleGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { prevPos: number }
  >({
    onStart(eventPayload, context, isCanceledOrFailed) {
      context.prevPos = rightHandlePos.value;
    },
    onActive(eventPayload, context) {
      rightHandlePos.value = Math.min(
        barWidth,
        Math.max(
          leftHandlePos.value,
          context.prevPos + eventPayload.translationX
        )
      );
      runOnJS(onEndPriceChange)(
        Math.round((maxPrice / barWidth) * rightHandlePos.value)
      );
    },
  });

  const leftHandleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: leftHandlePos.value,
      },
    ],
  }));

  const rightHandleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: rightHandlePos.value,
      },
    ],
  }));

  const barHighlightStyle = useAnimatedStyle(() => ({
    left: leftHandlePos.value,
    right: barWidth - rightHandlePos.value,
  }));

  const bars = useMemo(
    () => (
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        {new Array(Math.round(maxPrice / 50)).fill("").map((_, i) => {
          const randomValue = Math.random();
          return (
            <View
              key={i}
              style={{
                flex: 1,
                height: Math.round(randomValue * 40) + 8,
                backgroundColor: "#3b82f6",
                opacity: Math.max(0.3, Math.min(0.9, randomValue)),
              }}
            />
          );
        })}
      </View>
    ),
    []
  );

  useEffect(() => {
    if (barWidth === 0) return;

    leftHandlePos.value = (startPrice * barWidth) / maxPrice;
    rightHandlePos.value = (endPrice * barWidth) / maxPrice;
  }, [barWidth]);

  return (
    <View style={{ paddingHorizontal: 24, flex: 1 }}>
      <View style={{ marginBottom: 24 }}>
        <Text style={{color: colors.text}}>Price Range</Text>
      </View>

      {bars}

      <View
        style={[styles.graph, { backgroundColor: colors.border }]}
        onLayout={(event) => {
          setBarWidth(event.nativeEvent.layout.width);
        }}
      >
        <Animated.View
          style={[
            barHighlightStyle,
            styles.bar,
          ]}
        />

        <PanGestureHandler onGestureEvent={startHangleGesture}>
          <Animated.View
            style={[leftHandleStyle, { position: "absolute", zIndex: 11 }]}
          >
            <View
              style={{
                width: 1000,
                backgroundColor: colors.card,
                height: 48,
                position: "absolute",
                right: 12,
                bottom: 24,
              }}
            />
            <SliderHandler label={`$${startPrice.toFixed(0)}`} />
          </Animated.View>
        </PanGestureHandler>

        <PanGestureHandler onGestureEvent={endHangleGesture}>
          <Animated.View style={[rightHandleStyle, { position: "absolute" }]}>
          <View
              style={{
                width: 1000,
                backgroundColor: colors.card,
                height: 48,
                position: "absolute",
                left: 12,
                bottom: 24,
              }}
            />
            <SliderHandler label={`$${endPrice.toFixed(0)}`} />
          </Animated.View>
        </PanGestureHandler>
      </View>
      <View style={styles.range}>
        <Text style={{ color: colors.text, opacity: 0.5, zIndex: -1 }}>
          ${minPrice}
        </Text>
        <Text style={{ color: colors.text, opacity: 0.5, zIndex: -1 }}>
          ${maxPrice}
        </Text>
      </View>
    </View>
  );
};

export default PriceRangeSelector;

const styles = StyleSheet.create({
  graph: {
    height: 1,
    width: "100%",
    position: "relative",
  },
  bar: {
    position: "absolute",
    height: "100%",
    backgroundColor: '#3b82f6',
  },
  range: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
});
