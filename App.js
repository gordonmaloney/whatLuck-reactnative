import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import Main from "./components/Main";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default function App() {
  

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Main />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
  },
});
