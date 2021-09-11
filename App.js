import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import Main from "./components/Main";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default function App() {
  

  return (
    <Provider store={store}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>

      <View style={styles.container}>
        <Main />
      </View>
      </TouchableWithoutFeedback>

    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
    backgroundColor: '#c7efff9c',
  },
});
