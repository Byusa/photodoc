// This is the first file that ReactNative will run when it starts up.
//
// We jump out of here immediately and into our main entry point instead.
//
// It is possible to have React Native load our main module first, but we'd have to
// change that in both AppDelegate.m and MainApplication.java.  This would have the
// side effect of breaking other tooling like mobile-center and react-native-rename.
//
// It's easier just to leave it here.
import App from "./app/app.tsx"
import { AppRegistry } from "react-native"

import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

// const config = {
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   apiKey: "AIzaSyD0SWN-h4CvElFIXpdXjxxqed_kdw0ez2g",
//   authDomain: "photodocumentation-cf82e.firebaseapp.com",
//   databaseURL: "https://photodocumentation-cf82e-default-rtdb.firebaseio.com",
//   projectId: "photodocumentation-cf82e",
//   storageBucket: "photodocumentation-cf82e.appspot.com",
//   messagingSenderId: "1035861943070",
//   appId: "1:1035861943070:web:944c1485cb3c651885df0f",
//   measurementId: "G-21F20F44DQ",
// }

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyBpEl7qT5odPkPBkh0vwr97J01aNKJ4M64",
  authDomain: "diet-photo-data.firebaseapp.com",
  projectId: "diet-photo-data",
  storageBucket: "diet-photo-data.appspot.com",
  messagingSenderId: "220296184872",
  appId: "1:220296184872:web:4a91d2985ae1f57278e11d",
  measurementId: "G-5BJYYDQRWG",
}

firebase.initializeApp(config) //Initilazing our authenticaltion

/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */
const APP_NAME = "photodoc"

// Should we show storybook instead of our app?
//
// ⚠️ Leave this as `false` when checking into git.
const SHOW_STORYBOOK = false

let RootComponent = App
if (__DEV__ && SHOW_STORYBOOK) {
  // Only include Storybook if we're in dev mode
  const { StorybookUIRoot } = require("./storybook")
  RootComponent = StorybookUIRoot
}

AppRegistry.registerComponent(APP_NAME, () => RootComponent)
