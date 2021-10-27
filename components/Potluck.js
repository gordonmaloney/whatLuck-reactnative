import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, FlatList, PanResponder } from "react-native";
import { useDispatch } from "react-redux";
import { Card } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PotluckStandalone from "./PotluckStandalone";
import 'react-native-gesture-handler';
import * as Haptics from "expo-haptics";

import { Swipeable } from 'react-native-gesture-handler';

export default function Potluck({ item }) {

  const potluck = item;
  const navigation = useNavigation();

  const Reply = () => {
    let replies;
    potluck.replies.length > 3
      ? (replies = potluck.replies.slice(0, 2))
      : (replies = potluck.replies);

    return (
      <View>
        {replies.map((reply, i) => {
          return (
            <Card
            key={`reply-${i}`}
              containerStyle={{
                borderRadius: 12,
                borderWidth: 1,
                elevation: 0,
                backgroundColor: "rgba(255,255,255,0.6)",
                overflow: "hidden",
              }}
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
                <Text style={{fontSize: 16, fontFamily: 'NotoSans_700Bold'}}>
                  {reply.bringer} is bringing...</Text>
              <Card.Divider />
              <Text>
                {reply.bringing.map((bringItem, index) => {
                  return (
                    <Text style={{fontSize: 14, fontFamily: 'Montserrat_400Regular'}}>
                      {bringItem}
                      {index < reply.bringing.length - 2 ? ", " : ""}
                      {index === reply.bringing.length - 2 ? " and " : ""}
                    </Text>
                  );
                })}
              </Text>
            </Card>
          );
        })}
        {potluck.replies.length > 3 ? (
          <Card

            containerStyle={{
              borderRadius: 12,
              borderWidth: 1,
              elevation: 0,
              backgroundColor: "rgba(255,255,255,0.6)",
              overflow: "hidden",
            }}
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <Text>Open to view more...</Text>
          </Card>
        ) : (
          <View></View>
        )}
      </View>
    );
  };

  const LeftActions = () => {

    navigation.navigate("Potluck", {
      idCode: potluck.idCode,
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
  }

  return (
    <View>
      <Swipeable onSwipeableLeftWillOpen={() => LeftActions()}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Potluck", {
              idCode: potluck.idCode,
            });
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
        >
          <Card
            containerStyle={{
              borderRadius: 12,
              borderWidth: 1,
              elevation: 0,
              backgroundColor: "rgba(255,255,255,0.6)",
              overflow: "hidden",
            }}
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >

            <Text style={{fontSize: 25, fontFamily: 'NotoSans_700Bold'}}>
{potluck.potluckTitle}</Text>
            <Card.Divider />

            <Text style={{fontSize: 16, fontFamily: 'Montserrat_400Regular', marginBottom: 8}}>
                  <Text style={{fontWeight: 'bold'}}>Host: </Text>
                  {potluck.potluckHost}</Text>
                  <Text style={{fontSize: 16, fontFamily: 'Montserrat_400Regular', marginBottom: 8}}>
                  <Text style={{fontWeight: 'bold'}}>Theme: </Text>{potluck.potluckTheme}</Text>
                 
                  {item.essentials.length>0 &&

                  <Text style={{fontSize: 16, fontFamily: 'Montserrat_400Regular'}}>
                  <Text style={{fontWeight: 'bold'}}>Essentials:</Text>
              {item.essentials.map((essential, index) => {
                return (
                  <Text key={index}>
                    {" "}
                    {essential}
                    {index < potluck.essentials.length - 2 ? ", " : ""}
                    {index === potluck.essentials.length - 2 ? " and " : ""}
                  </Text>
                );
              })}
            </Text>}
            <Reply />
          </Card>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
}
