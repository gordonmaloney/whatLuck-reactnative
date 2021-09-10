import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, FlatList } from "react-native";
import { useDispatch } from "react-redux";


export default function Home() {

  return (
    <View>
        <Text>whatLuck is the one-stop potluck organising app.</Text>
        <Text></Text>
        <Text>Having a potluck, barbeque, or friends round for drinks and snacks? Then you're in the right place.</Text>
        <Text></Text>
        <Text>Simply Create a Potluck, fill in the details, and share it with your friends. It is that easy.</Text>
        <Text></Text>
        <Text>No more barbeques ruined by everyone bringing buns. No more hundred tubs of hummous. No more ten thousand spoons when all you need is a knife.</Text>
    </View>
  );
}