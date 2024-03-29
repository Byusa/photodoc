import React from "react"
import { View, ViewStyle, TextStyle, Dimensions } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing } from "../../theme"
import { translate } from "../../i18n/"
import VectorIcon from "react-native-vector-icons/FontAwesome5"

const { height } = Dimensions.get("window")

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  paddingTop: spacing[5],
  paddingBottom: spacing[5],
  justifyContent: "flex-start",
  // backgroundColor: "#ED3833"
}
const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: 32 }
const RIGHT: ViewStyle = { width: 32 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    useVectorIcons,
    rightIconName,
    leftIconName,
    style,
    titleStyle,
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""

  return (
    <View style={{ ...ROOT, ...style }}>
      {leftIcon || useVectorIcons ? (
        <Button preset="link" onPress={onLeftPress}>
          {useVectorIcons ? (
            <VectorIcon name={leftIconName} size={30} color={"#fff"} />
          ) : (
            <Icon icon={leftIcon} />
          )}
        </Button>
      ) : (
        <View style={LEFT} />
      )}

      <View style={TITLE_MIDDLE}>
        <Text style={{ ...TITLE, ...titleStyle }} text={header} />
      </View>
      {rightIcon || useVectorIcons ? (
        <Button preset="link" onPress={onRightPress}>
          {useVectorIcons ? (
            <VectorIcon name={rightIconName} size={30} color={"#fff"} />
          ) : (
            <Icon icon={rightIcon} />
          )}
        </Button>
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  )
}
