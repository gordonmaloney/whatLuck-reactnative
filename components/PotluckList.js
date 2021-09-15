import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, FlatList, RefreshControl, ScrollView, ImageBackground, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Card } from "react-native-elements";
import { getPotlucks } from "../actions/potlucks";
import Potluck from "./Potluck";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function PotluckList() {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    dispatch(getPotlucks());
  }, []);

  const potlucks = useSelector((state) => state.potlucks);

  console.log(potlucks);
  return (
    <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%', alignItems: 'center',}}>

    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.header}>All potlucks</Text>
      <FlatList
        keyExtractor={(item) => item._id}
        data={potlucks.reverse()}
        style={styles.flatlist}
        renderItem={({ item }) => (
          <View>
            <Potluck item={item} />
          </View>
        )}
      />

    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    paddingTop: 50,
    paddingBottom: 150
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: "center"
  },
  flatlist: {
    paddingBottom: 100
  }
});