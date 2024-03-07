import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";

const CustomBottomTabs = (props: BottomTabBarProps) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView edges={["bottom"]}>
      <View style={styles.bottomTabs}>
        {props.state.routes.map((route, i) => {
          const isActive = i === props.state.index;
          const iconName =
            route.name === "Home"
              ? "home"
              : route.name === "Cart"
              ? "shopping-cart"
              : route.name === "Payment"
              ? "account-balance-wallet"
              : "person";
          return (
            <Pressable
              key={route.key}
              onPress={() => props.navigation.navigate(route.name)}
              style={styles.tab}
            >
              <View
                style={[
                  styles.icon,
                  {
                    backgroundColor: isActive ? colors.primary : "transparent",
                  },
                ]}
              >
                <Icons
                  name={iconName}
                  size={24}
                  color={isActive ? colors.card : colors.text}
                  style={{ opacity: isActive ? 1 : 0.6 }}
                />
              </View>
              {isActive && <Text style={[styles.tabText, {color: colors.text}]}>{route.name}</Text>}
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default CustomBottomTabs;

const styles = StyleSheet.create({
  bottomTabs: {
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
  },
  icon: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
  },
  tabText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "600",
  },
});
