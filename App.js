import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  ImageBackground,
  Image,
} from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import Main from "./components/Main";

import AppLoading from "expo-app-loading";

//fonts
import { useFonts } from 'expo-font';
import { NotoSans_400Regular, NotoSans_400Regular_Italic, NotoSans_700Bold, NotoSans_700Bold_Italic } from '@expo-google-fonts/noto-sans';
//import { Montserrat_100Thin, Montserrat_100Thin_Italic, Montserrat_200ExtraLight, Montserrat_200ExtraLight_Italic, Montserrat_300Light, Montserrat_300Light_Italic, Montserrat_400Regular, Montserrat_400Regular_Italic, Montserrat_500Medium, Montserrat_500Medium_Italic, Montserrat_600SemiBold, Montserrat_600SemiBold_Italic, Montserrat_700Bold, Montserrat_700Bold_Italic, Montserrat_800ExtraBold, Montserrat_800ExtraBold_Italic, Montserrat_900Black, Montserrat_900Black_Italic, } from '@expo-google-fonts/montserrat';
import { Montserrat_400Regular } from "@expo-google-fonts/dev";
const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default function App() {
  let [fontsLoaded] = useFonts({
    NotoSans_400Regular, NotoSans_400Regular_Italic, NotoSans_700Bold, NotoSans_700Bold_Italic,
    Montserrat_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          accessible={false}
        >
          <View style={styles.container}>
            <ImageBackground
              source={require("./images/background.png")}
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
            >
              <Main />
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
