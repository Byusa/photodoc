/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react"
import { View, ViewStyle, TextStyle, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Wallpaper, Text, TextField } from "../../../components"
import { color, spacing, typography } from "../../../theme"
import Keyboardhelper from "../../../components/hoc/keyboardhelper"
import Icon from "react-native-vector-icons/FontAwesome5"
//import fire from "../../../../config/fire"
import { Icon as InsideIcon } from "../../../components/icon/icon"

//import firebase from "firebase/app"

const FULL: ViewStyle = { flex: 1 }

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
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
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

const ICONSTYLE: ViewStyle = {
  flexDirection: "row",
  alignSelf: "center",
}

const RegisterScreen = observer(function RegisterScreen() {
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState("")
  const [email, setUserEmail] = useState("")
  const [password, setUserPassword] = useState("")
  const [, setErrortext] = useState("")

  const navigation = useNavigation()

  const login = () => {
    navigation.navigate("login")
  }

  const registerPress = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        // ls.set("token", user.user.uid)
        setUser(u)
        navigation.navigate("home")
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  const loginwithfacebook = () => {
    // navigation.navigate("demo")
    // const fbProvider = new firebase.auth.FacebookAuthProvider()
    // firebase
    //   .auth()
    //   .signInWithPopup(fbProvider)
    //   .then(function (result) {
    //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //     let token = result.credential.accessToken
    //     // The signed-in user info.
    //     let user = result.user
    //     // ...
    //   })
    //   .catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code
    //     var errorMessage = error.message
    //     // The email of the user's account used.
    //     var email = error.email
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential
    //     // ...
    //   })
  }

  const loginwithgoogle = () => {
    // navigation.navigate("demo")
  }

  return (
    <View style={FULL}>
      <Wallpaper />
      <View style={{ flex: 0.6 }}></View>

      <View style={{ flex: 0.3, paddingTop: 300 }}>
        <Screen style={CONTAINER} backgroundColor={color.transparent}>
          <Text
            style={{
              color: "#858588",
              fontSize: 12,
              lineHeight: 12,
              left: "80%",
            }}
            onPress={login}
            tx="registerScreen.login"
          ></Text>

          <View style={CONTAINER}>
            <TextField
              placeholder="Name"
              autoCapitalize="none"
              onChangeText={(val) => setUserName(val)}
            />
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
              style={[CONTINUE, { marginTop: 10 }]}
              textStyle={CONTINUE_TEXT}
              tx="registerScreen.register"
              onPress={registerPress}
            />

            <Text style={TAGLINE} tx="registerScreen.tagLine1" />

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

      <View style={{ flex: 0.1 }}></View>
    </View>
  )
})

export const Registering = Keyboardhelper(RegisterScreen)
