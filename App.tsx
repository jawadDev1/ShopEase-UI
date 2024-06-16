import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, useColorScheme } from "react-native";
import RootNavigator, {
  RootStackParamList,
} from "./src/navigators/RootNavigator";
import { useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Generic for Stack Screen Prop Types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export default function App() {
  // For checking dark and light mode
  const colorScheme = useColorScheme();

  // App Theme for dark  and light mode
  const theme: Theme = useMemo(
    () =>
      colorScheme === "dark"
        ? {
            ...DarkTheme,
            colors: {
              ...DarkTheme.colors,
              primary: "#fff",
              text: "#fff",
            },
          }
        : {
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: "#f5f5f5",
              text: "#191919",
              border: "#D9D9D9",
              primary: "#191919",
            },
          },
    [colorScheme]
  );
  return (
    <SafeAreaProvider style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <NavigationContainer theme={theme}>
          {/* For Bottom Sheet */}
          <BottomSheetModalProvider>
            <RootNavigator />
          </BottomSheetModalProvider>
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
