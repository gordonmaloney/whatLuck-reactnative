import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, FlatList } from "react-native";
import { useDispatch } from "react-redux";

import { getPotlucks } from "../actions/potlucks";

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
              data={potlucks}
              renderItem={({item}) => <Text>{item.potluckTitle} - hosted by {item.potluckHost}</Text>}
            />
    </View>
  );
}