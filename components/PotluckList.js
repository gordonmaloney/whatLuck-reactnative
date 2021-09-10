import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { Card } from "react-native-elements";
import { getPotlucks } from "../actions/potlucks";
import Potluck from "./Potluck";
export default function PotluckList() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPotlucks());
    }, []);

  const potlucks = useSelector((state) => state.potlucks);

  console.log(potlucks);
  return (
    <View>
        <FlatList
            keyExtractor={item => item._id}
              data={potlucks}
              renderItem={({item}) => <View><Potluck item={item} /></View>}
            />
    </View>
  );
}