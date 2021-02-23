/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  Alert,
  Dimensions,
  Text,
  FlatList,
  Image,
  ImageBackground,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Header, Button, Screen } from "../../components"
import { color, spacing, typography } from "../../theme"
import Icon from "react-native-vector-icons/FontAwesome5"
import { Icon as MyIcon } from "../../components/icon/icon"
import * as ImagePicker from "react-native-image-picker"
import { PermissionsAndroid } from "react-native"
//import HorizontalBarGraph from "@chartiful/react-native-horizontal-bar-graph"
import firebase from "firebase/app"

//import { ImageStore, ImageStoreImpl } from "../../stateManagment/imageStore"

const { width, height } = Dimensions.get("window")

const images = [
  require("../../../assets/images/steak.jpg"),
  require("../../../assets/images/curry.jpg"),
  require("../../../assets/images/maize.jpg"),
  require("../../../assets/images/rolls.jpg"),
  require("../../../assets/images/curry.jpg"),
  require("../../../assets/images/maize.jpg"),
]

const nutrients = [
  {
    percent: "3.4%",
    nut: "Carbs",
  },
  {
    percent: "10.4%",
    nut: "Protein",
  },
  {
    percent: "8.4%",
    nut: "Fats",
  },
  {
    percent: "9.4%",
    nut: "Vitamins",
  },
  {
    percent: "8.4%",
    nut: "Fats",
  },
  {
    percent: "9.4%",
    nut: "Vitamins",
  },
]

// import { Camera } from "../../components/camera"

const FULL: ViewStyle = { flex: 1, backgroundColor: "#F4F5FA" }

const HOMESTYLE: ViewStyle = {
  paddingTop: 300,
  flexDirection: "row",
  justifyContent: "space-around",
}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}

const BOLD: TextStyle = { fontWeight: "bold" }

const HEADER: TextStyle = {
  paddingHorizontal: 10,
  backgroundColor: "#ED3833",
}

const HEADER_TITLE: TextStyle = {
  ...TEXT,
  fontSize: 20,
  lineHeight: 20,
  textAlign: "center",
  letterSpacing: 1.5,
}

const ICONSTYLE: ViewStyle = {
  // flexDirection: "row",
  flex: 0.2,
  // padding: 10,
  // margin: 15,
  // position: 'absolute',
  // display: 'flex',
  // bottom: 0,
  // flex: 1,
  // justifyContent: 'space-between',
  // alignSelf: 'center',
  backgroundColor: "red",
}

// interface ImageListProps {
//   imageStore: ImageStoreImpl
// }

// export const HomeScreen = observer(function HomeScreen() {
export const HomeScreen = observer(function HomeScreen(imageStore) {
  // const [imageSource, setImageSource] = useState<string | undefined>(undefined)
  const [filepath, setFilepath] = useState<string | undefined>(undefined)
  // const [data, setData] = useState<string | undefined>(undefined)
  const [uri, setUri] = useState<string | undefined>(undefined)
  const [image, setImage] = useState<string | undefined>(undefined)

  const RectangleNutrition = (props) => {
    return (
      <View
        style={{
          height: 60,
          alignSelf: "center",
          width: 80,
          borderRadius: 10,
          borderColor: "gray",
          borderWidth: 1,
          marginTop: 8,
          marginLeft: 8,
        }}
      >
        <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>{props.percent}</Text>
        </View>
        <View
          style={{
            flex: 0.3,
            backgroundColor: "#DEDEDE",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#241E1E", fontSize: 10 }}>{props.nut}</Text>
        </View>
      </View>
    )
  }

  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const goToLabelFood = () => {
    navigation.navigate("labelImage")
  }

  const capturePicture = () => {
    navigation.navigate("labelImage")
  }

  const signout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("register")
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  const openDrawer = () => {}
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: "App Camera Permission",
        message: "App needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      })
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given")
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const showCamera = (): void => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    }
    ImagePicker.launchCamera(options, async (response) => {
      console.log("Response = ", response)

      try {
        const granted = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        })
        if ((await granted) === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera permission given")
          if (response.didCancel) {
            console.log("User cancelled image picker")
            // alert("canceled", response.didCancel)
          } else if (response.error) {
            console.log("ImagePicker Error: ", response.error)
            // alert("canceled", response.error)
          } else if (response.customButton) {
            console.log("User tapped custom button: ", response.customButton)
            // alert("canceled", response.customButton)
          } else {
            const source = { uri: response.uri }
            //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxresponse", JSON.stringify(response))
            //setFilepath(response)
            //setData(response.data)
            // setUri(response.uri)
            setImage(response.uri)
            let img = response
            //ImageStore.addImage(image) //add the image to the store //@!!
            navigation.navigate("labelImage", { img }) // navigate to a diferent page

            // alert("Success", response.uri)
          }
        } else {
          console.log("Camera permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
    })
  }

  const chooseImage = (): void => {
    navigation.navigate("gallery")
  }

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [50, 20, 2, 86, 71, 100],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      },
    ],
    keys: [0, 1, 2, 3, 4, 5],
  }

  const config = {
    hasYAxisBackgroundLines: true,
    xAxisLabelStyle: {
      rotation: -30,
      fontSize: 12,
      width: 45,
      yOffset: 3,
      xOffset: -10,
    },
    yAxisLabelStyle: {
      rotation: 0,
      fontSize: 12,
      prefix: "",
      position: "bottom",
      xOffset: 15,
      decimals: 0,
      height: 100,
    },
  }

  return (
    <Screen preset="fixed">
      <View style={{ flex: 0.1 }}>
        <Header
          headerTx="home.home"
          useVectorIcons={true}
          leftIconName={"bars"}
          rightIconName={"user"}
          onLeftPress={openDrawer}
          onRightPress={signout}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
      </View>

      <View style={{ flex: 0.2, paddingTop: 5 }}>
        <FlatList
          data={[0, 1, 2, 3, 4, 5]}
          horizontal
          renderItem={({ item }) => {
            console.log(images[item])
            return (
              <View style={{ alignSelf: "center", padding: 5 }}>
                <Image
                  source={images[item]}
                  style={{ width: 100, height: 80, borderRadius: 10 }}
                  resizeMode={"cover"}
                />
              </View>
            )
          }}
        />
        {/* Display iomages using faltlist set to hrizonatl and allow scrollable   */}
      </View>

      <View style={{ flex: 0.5 }}>
        <View style={{ flex: 0.7, borderRadius: 10, borderWidth: 4, borderColor: "#C3C3C3" }}>
          {/* <HorizontalBarGraph
            data={[50, 70, 80, 20, 90, 100]}
            labels={["Rice", "Chicken", "Maize", "Curry", "Steak", "Rolls"]}
            width={width - 10}
            // @ts-ignore
            height={height * 0.5 * 0.7} // need to change for responsiveness
            barColor={"#EB3B36"}
            barWidthPercentage={0.9}
            // @ts-ignore
            baseConfig={config}
            style={{
              // flex: 1,
              flowGrow: 1,
              // marginBottom: 30,
              // padding: 10,
              // paddingTop: 20,
              borderRadius: 15,
              borderColor: "#C3C3C3",
              borderWidth: 1,
              // width: 375,
              backgroundColor: "white",

              //borderRadius: 4
            }}
          /> */}
        </View>
        <View style={{ flex: 0.3, zIndex: 1 }}>
          <FlatList
            data={nutrients}
            horizontal
            renderItem={({ item }) => {
              return <RectangleNutrition percent={item.percent} nut={item.nut} />
            }}
          />
        </View>
      </View>

      <View
        style={{
          flex: 0.2,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 8,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 125,
            borderColor: "#707070",
            borderWidth: 1,
          }}
        >
          <Icon name="image" size={60} color="red" onPress={chooseImage} />
        </View>

        {/* <View
          style={{
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 125,
            borderColor: '#707070',
            borderWidth: 1,
          }}
        >
          <ImageBackground source={{
            uri: image,
          }}
            style={{ height: 100, width: 100 }}
            imageStyle={{ borderRadius: 15 }}
          />
        </View> */}

        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 125,
            borderColor: "#707070",
            borderWidth: 1,
          }}
        >
          <Icon name="camera" size={60} color="red" onPress={showCamera} />
        </View>
      </View>
    </Screen>
  )
})
