import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";

const ProfileScreen = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      edges={["bottom", "top"]}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={styles.heading}>Profile</Text>
      <Image
        source={require("../assets/images/image-2.jpg")}
        style={styles.img}
        resizeMode="cover"
      />

    <View style={styles.card}>
    <Icons name="person" size={28} color={'#fff'} />
    <Text style={styles.text}>Uchiha Itachi</Text>
    </View>

    <View style={styles.card}>
    <Icons name="email" size={28} color={'#fff'} />
    <Text style={styles.text}>example@gmail.com</Text>
    </View>

    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 27,
    color: "#fff",
    fontWeight: "700",
  },
  container: {
    padding: 23,
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 15,
  },
  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#1e1e1e",
    paddingVertical: 19,
    paddingHorizontal: 15,
    marginTop: 21,
    alignItems: "center",
    borderRadius: 16,
    
  },
  text: {
    fontSize: 21,
    fontWeight: "600",
    color: "#fff",
  },
});
