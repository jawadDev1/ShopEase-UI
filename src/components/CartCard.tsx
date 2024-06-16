import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Icons from "@expo/vector-icons/MaterialIcons";
import React from 'react'

interface Props {
    title: string,
    price: string,
    imgUrl: string
}

const CartCard = ({ title, price, imgUrl}: Props) => {
  return (
    <View style={styles.cartCard}>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <Image
            source={{uri: imgUrl}}
            style={styles.img}
            resizeMode="cover"
          />

          <View style={{ gap: 12}}>
            <Text style={styles.title}> {title}</Text>
            <Text style={styles.price}> {price}</Text>
          </View>
        </View>
        <View style={styles.counter}>
          <TouchableOpacity style={styles.counterBtn}>
            <Icons name="add" size={23} color={"#fff"} />
          </TouchableOpacity>
          <Text style={styles.count}>5</Text>
          <TouchableOpacity style={styles.counterBtn}>
            <Icons name="remove" size={23} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default CartCard

const styles = StyleSheet.create({
    cartCard: {
        flexDirection: "row",
        gap: 12,
        backgroundColor: "#1e1e1e",
        paddingVertical: 9,
        paddingHorizontal: 15,
        marginTop: 15,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 16,
      },
      img: {
        width: 60,
        height: 60,
        borderRadius: 23,
      },
      title: {
        fontSize: 21,
        fontWeight: "600",
        color: "#fff",
      },
      price: {
        fontSize: 21,
        fontWeight: "600",
        color: "#fff",
        textAlign: 'center'
      },
      counter: {
        flexDirection: "row",
        gap: 12,
      },
      counterBtn: {},
      count: {
        fontSize: 17,
        fontWeight: "600",
        color: "#fff",
      },
})