import React, { SFC } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default (WrappedComponent: any) => {
  const keyboardControlHOC = ({ ...props }) => {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <WrappedComponent {...props} />
      </KeyboardAwareScrollView>
    )
  }
  return keyboardControlHOC
}
