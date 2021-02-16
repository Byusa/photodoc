/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React, { useEffect, useState } from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { WelcomeScreen, DemoScreen } from "../screens"
import firebase from "firebase/app"
import {
  Registering,
  Logining,
  //HomeScreen,
  LoadingScreen,
  //LabelImage,
  //GalleryScreen
} from "../screens"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  register: undefined
  login: undefined
  loadingScreen: undefined
  home: undefined
  labelImage: undefined
}

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const Stack = createNativeStackNavigator<PrimaryParamList>()

const authRoutes = [
  { name: "login", component: Logining },
  { name: "register", component: Registering },
]

const appRoutes = [
  // { name: "home", component: HomeScreen },
  // { name: "labelImage", component: LabelImage },
  // { name: "gallery", component: GalleryScreen }
]

export function PrimaryNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
        setIsLoading(false)
      } else {
        setIsLoggedIn(false)
        setIsLoading(false)
      }
    })
  }, [])

  if (isLoading) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="loadingScreen" component={LoadingScreen} />
      </Stack.Navigator>
    )
  }

  const routues = isLoggedIn ? appRoutes : authRoutes

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      {routues.map((item, index) => {
        // eslint-disable-next-line react/jsx-key
        return <Stack.Screen name={item.name} key={index} component={item.component} />
      })}
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
