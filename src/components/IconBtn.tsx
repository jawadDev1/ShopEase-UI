import { StyleSheet,  TouchableOpacity } from 'react-native'
import React from 'react'
import Icons from "@expo/vector-icons/MaterialIcons";

type IconBtnProps = {
    name: any,
    onPress?: () => void,
}

const IconBtn = ({name, onPress}: IconBtnProps) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={styles.iconBtn}
    >
      <Icons name={name} size={24} color={'#fff'} />
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