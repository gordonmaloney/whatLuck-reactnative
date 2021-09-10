import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, FlatList, Button } from "react-native";
import { useDispatch } from "react-redux";
import { SpeedDial } from 'react-native-elements';
import SpeedDialMenu from './SpeedDial'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './Home'
import CreatePotluck from './CreatePotluck'
import PotluckList from "./PotluckList";
import PotluckStandalone from "./PotluckStandalone";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Home />
    </View>
  );
}

function CreatePotluckScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CreatePotluck />

    </View>
    
  );
}

function PotluckListScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <PotluckList />
      

    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreatePotluck" component={CreatePotluckScreen} />
        <Stack.Screen name="PotluckList" component={PotluckListScreen} />
        <Stack.Screen name="PotluckStandalone" component={PotluckStandalone} />

      </Stack.Navigator>

      <SpeedDialMenu />
    </NavigationContainer>
  );
}