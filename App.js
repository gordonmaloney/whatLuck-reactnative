import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  ImageBackground, Image
} from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import Main from "./components/Main";



const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default function App() {
  return (
   
    <Provider store={store}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <View style={styles.container}>
        <ImageBackground source={require("./images/background.png")}   style={{ flex: 1, width: '100%', height: '100%', position: "absolute"}} >

            <Main />
            </ImageBackground>

        </View>
      </TouchableWithoutFeedback>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: "center",
  },
});
