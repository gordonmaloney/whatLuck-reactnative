import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, FlatList, Image, ImageBackground } from "react-native";
import { useDispatch } from "react-redux";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";




export default function Home() {
  const navigation = useNavigation();

  const handleCreateClick = () => {
    console.log("test")
    navigation.navigate('Create Potluck')
  }

  return (
    <View style={styles.container}>

      <View style={styles.image}>
        <Image source={require('../images/whatluck-logo.png')}  style={{ align: 'center', width: 250, height: 102, marginBottom: 5 }} />
      </View>  
        <Text style={styles.header}>whatLuck is the one-stop potluck organising app.</Text>
        <Text style={styles.para}>Having a potluck, barbeque, or friends round for drinks and snacks? Then you're in the right place.</Text>
        <Text style={styles.para}>Simply <Text style={styles.link} onPress={handleCreateClick}>Create a Potluck</Text>, fill in the details, and share it with your friends. It is that easy.</Text>
        <Text style={styles.para}>No more barbeques ruined by everyone bringing buns. No more hundred tubs of hummous. No more ten thousand spoons when all you need is a knife.</Text>
    
    </View>
  );
}

const styles = StyleSheet.create({
image: {
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: 25
},
link: {
  textDecorationLine: 'underline',
  color: 'blue'
},
  container: {
    width: '80%',
    paddingBottom: 50
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: "bold"
  },
  para: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24
  }

})