import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, FlatList, RefreshControl, ScrollView } from "react-native";
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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <FlatList
        keyExtractor={(item) => item._id}
        data={potlucks.reverse()}
        renderItem={({ item }) => (
          <View>
            <Potluck item={item} />
          </View>
        )}
      />
    </ScrollView>
  );
}
