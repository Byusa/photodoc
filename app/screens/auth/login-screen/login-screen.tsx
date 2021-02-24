/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react"
import { View, ViewStyle, TextStyle, TextInput, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Wallpaper, Text, TextField } from "../../../components"
import { color, spacing, typography } from "../../../theme"
import Keyboardhelper from "../../../components/hoc/keyboardhelper"
import Icon from "react-native-vector-icons/FontAwesome5"
//import fire from "../../../../config/fire"//
//import firebase from "firebase/app"
import { Icon as InsideIcon } from "../../../components/icon/icon"
import auth from "@react-native-firebase/auth"

// import { Icon as FontAwesome } from "../../../components/icon/icon"

const FULL: ViewStyle = { flex: 1, paddingTop: 300 }

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[5],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const TAGLINE: TextStyle = {
  color: "#858588",
  fontSize: 10,
  lineHeight: 12,
  marginBottom: spacing[4] + spacing[1],
}

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "black",
  marginTop: 10,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

const ICONSTYLE: ViewStyle = {
  flexDirection: "row",
  padding: 10,
  margin: 15,
  alignSelf: "center",
}

const LoginScreen = observer(function LoginScreen() {
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState("")
  const [email, setUserEmail] = useState("")
  const [password, setUserPassword] = useState("")
  const [, setErrortext] = useState("")

  const navigation = useNavigation()

  const loginPress = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((u) => {
        setUser(u)
        // ls.set("token", u.user.uid) // Any time the  user logs in persist to local storage
        navigation.navigate("home")
      })
      .catch((error) => {
        alert(error.message)
      })
  }
  //var provider = new firebase.auth.FacebookAuthProvider()
  const loginwithfacebook = () => {
    // auth()
    // .signInWithPopup(provider)
    // .then(function (result) {
    //   var token = result.credential.accessToken
    //   var user = result.user
    //   console.log(token)
    //   console.log(user)
    // })
    // .catch(function (error) {
    //   console.log(error.code)
    //   console.log(error.message)
    // })
  }
  const loginwithgoogle = () => {
    // navigation.navigate("demo")
  }

  const register = () => {
    navigation.navigate("register")
  }

  return (
    <View style={FULL}>
      <Wallpaper />
      <View style={{ flex: 0.3 }}>
        <Screen style={CONTAINER} backgroundColor={color.transparent}>
          <Text
            style={{
              color: "#858588",
              fontSize: 12,
              lineHeight: 12,
              left: "80%",
            }}
            onPress={register}
            tx="registerScreen.register"
          ></Text>
          <View style={CONTAINER}>
            <TextField
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(val) => setUserEmail(val)}
            />
            <TextField
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(val) => setUserPassword(val)}
            />

            <Button
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              tx="loginScreen.login"
              onPress={loginPress}
            />

            <View style={ICONSTYLE}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#FFFFFF",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginRight: 15,
                }}
              >
                <Icon name="facebook-f" size={30} color="blue" onPress={loginwithfacebook} />
              </View>

              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#FFFFFF",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                {/* <Icon name="google" size={30} color="green" onPress={loginwithgoogle} /> */}
                <Button
                  style={{
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    backgroundColor: "#FFFFFF",
                    alignItems: "center",
                  }}
                  onPress={loginwithgoogle}
                >
                  {/* <InsideIcon icon="google" /> */}
                </Button>
              </View>
            </View>
          </View>
        </Screen>
      </View>
    </View>
  )
})

export const Logining = Keyboardhelper(LoginScreen)
