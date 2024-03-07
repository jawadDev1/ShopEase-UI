import React from "react";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Example from "../components/Example";
import Icons from "@expo/vector-icons/MaterialIcons";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParamList } from "./RootNavigator";
import { RootStackScreenProps } from "../../App";
import CustomBottomTabs from "../components/CustomBottomTabs";

export type TabsStackParamList = {
  Home: undefined;
  Cart: undefined;
  Payment: undefined;
  Profile: undefined;
};

const TabStack = createBottomTabNavigator<TabsStackParamList>();

export type TabStackScreenProps<T extends keyof TabsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, T>,
    RootStackScreenProps<"TabsStack">
  >;

const TabsNavigator = () => {
  return (
    <TabStack.Navigator screenOptions={{ tabBarShowLabel: false }} tabBar={props => <CustomBottomTabs {...props} />}>
      <TabStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: (props) => {
            return <Icons name="home" {...props} />;
          },
        }}
      />
      <TabStack.Screen
        name="Cart"
        component={Example}
        options={{
          tabBarIcon: (props) => {
            return <Icons name="shopping-cart" {...props} />;
          },
        }}
      />
      <TabStack.Screen
        name="Payment"
        component={Example}
        options={{
          tabBarIcon: (props) => {
            return <Icons name="account-balance-wallet" {...props} />;
          },
        }}
      />
      <TabStack.Screen
        name="Profile"
        component={Example}
        options={{
          tabBarIcon: (props) => {
            return <Icons name="person" {...props} />;
          },
        }}
      />
    </TabStack.Navigator>
  );
};

export default TabsNavigator;
