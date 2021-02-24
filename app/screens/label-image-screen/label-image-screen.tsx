import React, { useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, ImageBackground } from "react-native"
import { observer } from "mobx-react-lite"
import { useNavigation, useNavigationState } from "@react-navigation/native"
import { Button, Header, Text, TextField } from "../../components"
import { color, spacing, typography } from "../../theme"
import Keyboardhelper from "../../components/hoc/keyboardhelper"
//import firebase from "firebase/app"
import { LogBox } from "react-native"
//import "firebase/firestore"

const FULL: ViewStyle = { flex: 1, backgroundColor: "#F4F5FA" }

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
  color: "black",
  fontSize: 15,
  lineHeight: 17,
  marginBottom: spacing[4] + spacing[1],
}

const TEXTLABEL: TextStyle = {
  color: "black",
  fontSize: 16,
}

const SAVE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "black",
  width: "90%",
}

const HEADER: TextStyle = {
  paddingHorizontal: 10,
  backgroundColor: "#ED3833",
}

const SAVE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

const FOODLABELSTYLE: ViewStyle = {
  flex: 0.2,
  justifyContent: "space-around",
  marginLeft: 20,
  padding: 1,
}

const HEADER_TITLE: TextStyle = {
  ...TEXT,
  fontSize: 20,
  lineHeight: 20,
  textAlign: "center",
  letterSpacing: 1.5,
}

//////////////////////////////////////////////////////

const LabelImageScreen = observer(function LabelImageScreen() {
  const [foodName, setFoodName] = useState<string | undefined>(undefined)
  const [alternateFoodName, setAlternateFoodName] = useState<string | undefined>(undefined)
  const [ingredients, setIngredients] = useState<string | undefined>(undefined)
  const [nutrients, setNutrients] = useState<string | undefined>(undefined)
  const [image, setImage] = useState<string | undefined>(undefined)
  const [file, setFile] = useState<string | undefined>(undefined)

  const navigation = useNavigation()

  const uploadImage = async () => {
    // const db = firebase.firestore()
    // //Save image to storage
    // const foodInfo = "food" + "/" + foodName + "/" + file.fileName
    // const response = await fetch(image)
    // const blob = await response.blob()
    // var ref = firebase.storage().ref().child(foodInfo)
    // await ref
    //   .put(blob)
    //   .then(function () {
    //     console.log("dddddddddddd image successfully written!")
    //   })
    //   .catch(function (error) {
    //     console.error("eeeeeeeeeeeeeee Error writing image: ", error)
    //   })
    // const picturePath = ref._delegate._location.path_
    // var storageRef = await firebase.storage().ref(picturePath)
    // var url = await storageRef.getDownloadURL().then(
    //   function (url) {
    //     console.log(url)
    //   },
    //   function (error) {
    //     console.log(error)
    //   },
    // )
    // console.log("---------------------")
    // console.log("xxxxxxxxxxxxxxxxxxx = ", url, " = xxxxxxxxxxxxxxxxxxx ")
    // console.log("---------------------")
    // //console.log("YYYYYY", picturePath)
    // const Userid = firebase.auth().currentUser && firebase.auth().currentUser.uid
    // var docRef = firebase.firestore().collection("food").doc(foodName.toLowerCase())
    // //Save document to firestore
    // await firebase
    //   .firestore()
    //   .collection("food")
    //   .doc(foodName.toLowerCase())
    //   .set(
    //     {
    //       id: Userid,
    //       Food_Name: foodName.toLowerCase(),
    //       Alternate_Food_Name: alternateFoodName,
    //       Ingredients: ingredients,
    //       Nutrients: nutrients,
    //       foodImageCollection: firebase.firestore.FieldValue.arrayUnion({
    //         userId: Userid,
    //         picturePath: picturePath,
    //         //url: url,
    //       }),
    //     },
    //     { merge: true },
    //   )
    //   .then(function () {
    //     console.log("dddddddddddd Food Name successfully written!")
    //   })
    //   .catch(function (error) {
    //     console.error("eeeeeeeeeeeeeee Error3 writing Food Name: ", error)
    //   })
    // console.log("end")
    // LogBox.ignoreLogs(["Setting a timer"])
    // console.log("ppppppppppppp")
    // navigation.navigate("home")
  }

  const navState = useNavigationState((state) => state.routes)

  useEffect(() => {
    let response = navState[1].params
    console.log("response.img.uri =  ", response.img.uri)
    console.log("response.img.fileName =  ", response.img.fileName)
    setImage(response.img.uri)
    setFile(response.img)
    //////
    // console.log("rerrrrrrrrrrrrrr", response);
    // console.log("/////////////types////////");
    // console.log("type response =   ", typeof response)
    // console.log("type response.img.uri =  ", typeof response.img.uri)
    // console.log("type response.img.fileName =  ", typeof response.img)
    // console.log("/////////////types////////");
  })

  const back = () => {
    navigation.navigate("home")
  }

  return (
    <View style={FULL}>
      <View style={{ flex: 0.1 }}>
        <Header
          headerTx="labelImage.title"
          useVectorIcons={false}
          leftIconName={"chevron-left"}
          onLeftPress={back}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
      </View>

      <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            borderColor: "#707070",
            borderWidth: 1,
          }}
        >
          <ImageBackground
            source={{
              // uri: JSON.stringify(navState[1].params),
              uri: image,
            }}
            style={{ height: 100, width: 100 }}
            imageStyle={{ borderRadius: 15 }}
          />
        </View>
      </View>

      <View
        style={{
          flex: 0.47,
          justifyContent: "center",
          width: 325,
          borderRadius: 20,
          backgroundColor: "#FFFFFF",
          borderWidth: 0.5,
          borderColor: "gray",
          marginTop: 10,
          marginLeft: 20,
        }}
      >
        <View style={FOODLABELSTYLE}>
          <Text style={TEXTLABEL} tx="labelImage.foodName" />
          <TextField
            placeholderTx="labelImage.foodNamePlaceHolder"
            autoCapitalize="none"
            onChangeText={(val) => setFoodName(val.toLowerCase())}
          />
        </View>

        <View style={FOODLABELSTYLE}>
          <Text style={TEXTLABEL} tx="labelImage.alternateFoodName" />
          <TextField
            placeholderTx="labelImage.alternateFoodNamePlaceHolder"
            autoCapitalize="none"
            onChangeText={(val) => setAlternateFoodName(val)}
          />
        </View>

        <View style={FOODLABELSTYLE}>
          <Text style={TEXTLABEL} tx="labelImage.ingredients" />
          <TextField
            placeholderTx="labelImage.ingredientsPlaceHolder"
            autoCapitalize="none"
            onChangeText={(val) => setIngredients(val)}
          />
        </View>

        <View style={FOODLABELSTYLE}>
          <Text style={TEXTLABEL} tx="labelImage.nutrients" />
          <TextField
            placeholderTx="labelImage.nutrientsPlaceHolder"
            autoCapitalize="none"
            onChangeText={(val) => setNutrients(val)}
          />
        </View>

        <View style={FOODLABELSTYLE}>
          <Button
            style={SAVE}
            textStyle={SAVE_TEXT}
            tx="labelImage.saveButton"
            onPress={uploadImage}
          />
        </View>
      </View>

      <View style={{ flex: 0.03 }}></View>
    </View>
  )
})

//export default Keyboardhelper(LabelImageScreen)
export const LabelImage = Keyboardhelper(LabelImageScreen)
