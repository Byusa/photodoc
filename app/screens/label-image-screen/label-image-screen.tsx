import React, { useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, ImageBackground, Platform } from "react-native"
import { observer } from "mobx-react-lite"
import { useNavigation, useNavigationState } from "@react-navigation/native"
import { Button, Header, Text, TextField } from "../../components"
import { color, spacing, typography } from "../../theme"
import Keyboardhelper from "../../components/hoc/keyboardhelper"
//import fire, { db } from "../../../config/fire"
import { uuid } from "uuidv4"
import firebase from "firebase/app"
//import * as RNFS from "react-native-fs"
import { LogBox } from "react-native"
import "firebase/firestore"
import { resolveConfig } from "prettier"
import { reject } from "ramda"

import ImagePicker from "react-native-image-picker"
//import RNFetchBlob from "react-native-fetch-blob"

//const block = RNFetchBlob.polyfill.Blob
//const fs = RNFetchBlob.fs

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

  // const rnfs = require("react-native-fs")
  //const fs = require('fs');

  const saveImage = async () => {
    const Userid = firebase.auth().currentUser && firebase.auth().currentUser.uid

    const id = firebase.firestore().collection("food").doc().id
    //firefirestore.collection('Food').doc().id

    // var storageRef = firebase.storage.ref()

    // var foodRef = storageRef.child(foodName)

    // var foodImagesRef = storageRef.child()

    // fileRef.put(foodName)

    // console.log("User id", Userid)
    // console.log("Food id", id)

    // const storageRef = firebase.storage().ref()
    // const fileRef = storageRef.child(file.fileName)
    // await fileRef.put(file)
    // firebase.firestore().collection("food").doc(id).update({
    //     image: firebase.firestore.FieldValue.arrayUnion({
    //         name: file.name,
    //         url: await fileRef.getDownloadURL()
    //     })
    // })
    //////////////////////////////////////////////

    const storageRef = firebase.storage().ref()
    //const forestRef = storageRef.child(file.fileName)
    //image uri
    const imageURI = file.uri
    console.log("imageURI = " + imageURI)
    //image type
    const imageType = file.type
    console.log("imageType = " + imageType)
    // Image Blob
    // const blob = new Blob([imageURI], { type: `${imageType}` });
    // console.log('Adding Blob');
    // console.log(blob.data);

    const filePathRef = storageRef.child(foodName + "/" + file.fileName)
    console.log("file path = " + filePathRef)

    const metadata = {
      contentType: `${imageType}`,
    }
    console.log(" metadata = " + metadata)

    //await filePathRef.put(file, metadata)

    firebase
      .firestore()
      .collection("food")
      .doc(foodName)
      .update({
        image: firebase.firestore.FieldValue.arrayUnion({
          name: file.fileName,
          url: await filePathRef.getDownloadURL(),
        }),
      })
    /////

    // Upload the file and metadata
    //storageRef.child(filePathRef).put(file, metadata);

    // // const id = colRef.doc().id and colRef.doc(id).update() can be replaced with just colRef.add() (colRef being a CollectionReference)

    // firebase.firestore().collection("food").doc(id).update({
    //   image: firebase.firestore.FieldValue.arrayUnion({
    //     name: capture.fileName,
    //     url: await fileRef.getDownloadURL()
    //   })
    // });

    //////////////////////////////////////////////

    // var ref = firebase.storage().ref().child(foodName + image);
    // ref.put(image)
    // const storageRef = firebase.storage().ref()
    // const fileRef = storageRef.child(foodName + image) //name of it
    // fileRef.put(image) //store image

    //check if the foodName is not there yet

    // if (!foodName) {
    //   return
    // }

    // firebase.firestore().collection("food").doc(foodName.toLowerCase()).set({
    //   id: Userid,
    //   Food_Name: foodName.toLowerCase(),
    //   Alternate_Food_Name: alternateFoodName,
    //   Ingredients: ingredients,
    //   Nutrients: nutrients,
    //   imageURL: image
    // })
    //   .then(function () {
    //     console.log("dddddddddddd Document successfully written!");
    //   }).catch(function (error) {
    //     console.error("eeeeeeeeeeeeeee Error writing document: ", error);
    //   });

    //console.log("Result", res);
    LogBox.ignoreLogs(["Setting a timer"])
    console.log("ppppppppppppp")
    navigation.navigate("home")
  }

  const uploadImage = async () => {
    //Save image to storage
    const response = await fetch(image)
    const blob = await response.blob()
    var ref = firebase
      .storage()
      .ref()
      .child("food" + "/" + foodName + "/" + file.fileName)
    ref.put(blob)

    //create a folder named to keep images
    const Userid = firebase.auth().currentUser && firebase.auth().currentUser.uid
    //const id = firebase.firestore().collection("food").doc().id
    //check if the foodName already exist
    firebase
      .firestore()
      .collection("food")
      .doc(foodName.toLowerCase())
      .set({
        id: Userid,
        Food_Name: foodName.toLowerCase(),
        Alternate_Food_Name: alternateFoodName,
        Ingredients: ingredients,
        Nutrients: nutrients,
        imageURL: image,
      })
      .then(function () {
        console.log("dddddddddddd Document successfully written!")
      })
      .catch(function (error) {
        console.error("eeeeeeeeeeeeeee Error writing document: ", error)
      })

    //keep images
    firebase
      .firestore()
      .collection("food")
      .doc(foodName)
      .update({
        image: firebase.firestore.FieldValue.arrayUnion({
          name: file.name,
          url: await ref.getDownloadURL(),
        }),
      })

    LogBox.ignoreLogs(["Setting a timer"])
    console.log("ppppppppppppp")
    navigation.navigate("home")
  }
  const uploadImage1 = () => {
    // console.log("inside the method")
    // const uri = image;
    // const mime = 'application/octet-stream';
    // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    // const sessionId = new Date().getTime()
    // let uploadBlob = null
    // const imageRef = firebase.storage().ref(foodName).child(file.fileName)
    // console.log("after the info")
    // fs.readFile(uploadUri, 'base64')
    //   .then((data) => {
    //     console.log("success 1")
    //     Blob.build(data, { type: `${mime};BASE64` })
    //   })
    //   .then((blob) => {
    //     console.log(" Good")
    //     uploadBlob = blob
    //     imageRef.put(blob, { contentType: mime })
    //   })
    //   .then(() => {
    //     uploadBlob.close()
    //     imageRef.getDownloadURL()
    //   })
    //   .then((url) => {
    //     resolve(url)
    //     storeReference(url, sessionId)
    //   })
    //   .catch((error) => {
    //     reject(error)
    //   })
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
