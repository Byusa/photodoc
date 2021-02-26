import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { Header, Screen } from "../../components"
import { color, spacing, typography } from "../../theme"
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

const HEADER: TextStyle = {
  paddingHorizontal: 10,
  backgroundColor: "#ED3833",
}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  fontSize: 20,
  lineHeight: 20,
  textAlign: "center",
  letterSpacing: 1.5,
}

const images = [
  require("../../../assets/images/steak.jpg"),
  require("../../../assets/images/curry.jpg"),
  require("../../../assets/images/maize.jpg"),
  require("../../../assets/images/rolls.jpg"),
  require("../../../assets/images/curry.jpg"),
  require("../../../assets/images/maize.jpg"),
]

const ICONSTYLE: ViewStyle = {
  flexDirection: "row",
  padding: 10,
  margin: 5,
  alignSelf: "stretch",
  justifyContent: "space-between",
}

export const GalleryScreen = observer(function GalleryScreen(gallery) {

  const navigation = useNavigation()

  const [albums, setAlbums] = useState([])

  useEffect(() => {
    //Our use effect now is triggered only once we change anything 
    //cause we added [] (without [], it would be triggered in every component update)
    const unmount = db.collection('food').onSnapshot((snapshot) => {
      const tempAlbums = []
      snapshot.forEach(doc => {
        //distructuring
        tempAlbums.push({
          ...doc.data(),
          id: doc.id
        });
      })
      setAlbums(tempAlbums)
      tempAlbums.map((temp) => { console.log(temp) })
    })
    return unmount
  }, [])

  const back = () => {
    navigation.navigate("home")
  }

  return (
    <Screen preset="fixed">
      <View style={{ flex: 0.15 }}>
        <Header
          headerTx="gallery.title"
          useVectorIcons={true}
          leftIconName={"chevron-left"}
          onLeftPress={back}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
      </View>

      <View style={{ flex: 0.85 }}>

      {albums.map((album) => (
            <div>
                {/* <Link to={`/${album.id}`}> */}
                    <aside key={album.Food_Name} >
                        <img src={album.foodImageCollection ? album.foodImageCollection[0].url : ""} alt="album" />
                        <h3> {album.Food_Name} </h3>
                    </aside>
                {/* </Link> */}

            </div>
          ))
      }
        {/* <FlatList
          data={[0, 1, 2, 3, 4, 5]}
          vertical
          renderItem={({ item }) => {
            return (
              <View style={{ padding: 5 }}>
                <View style={ICONSTYLE}>
                  <View>
                    <Image
                      source={images[item]}
                      style={{ width: 100, height: 80, borderRadius: 10 }}
                      resizeMode={"cover"}
                    />
                  </View>
                  <View>
                    <Image
                      source={images[item]}
                      style={{ width: 100, height: 80, borderRadius: 10 }}
                      resizeMode={"cover"}
                    />
                  </View>
                  <View>
                    <Image
                      source={images[item]}
                      style={{ width: 100, height: 80, borderRadius: 10 }}
                      resizeMode={"cover"}
                    />
                  </View>
                </View>
              </View>
            )
          }}
        /> */}
      </View>
    </Screen>
  )
})
