import { observer } from "mobx-react-lite"
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react"
import { View, ViewStyle, ActivityIndicator } from "react-native"
import { Screen, Wallpaper } from "../../../components"
import { color, spacing } from "../../../theme"

const FULL: ViewStyle = { flex: 1, justifyContent: "center", alignItems: "center" }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[5],
}
export const LoadingScreen = observer(function RegisterScreen() {
  return (
    <Screen style={FULL} preset="fixed">
      <ActivityIndicator size="large" color={"blue"} />
    </Screen>
    // <View style={FULL}>
    //   <Wallpaper />
    //   <Screen style={CONTAINER} preset="fixed">
    //     <ActivityIndicator size="large" color={"blue"} />
    //   </Screen>
    // </View>
  )
})
