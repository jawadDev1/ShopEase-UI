import { StyleSheet,  TouchableOpacity } from 'react-native'
import React from 'react'
import Icons from "@expo/vector-icons/MaterialIcons";

type IconBtnProps = {
    name: any,
    onPress?: () => void,
    color?: string
}

const IconBtn = ({name, onPress, color}: IconBtnProps) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={styles.iconBtn}
    activeOpacity={0.6}
    >
      <Icons name={name} size={29} color={color || '#fff'}  />
    </TouchableOpacity>
  )
}

export default IconBtn

const styles = StyleSheet.create({
  iconBtn: {
    width: 52,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#fff'
  },
})