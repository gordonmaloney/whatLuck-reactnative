import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Card } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PotluckStandalone from "./PotluckStandalone";

import * as Haptics from "expo-haptics";

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
        {replies.map((reply) => {
          return (
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
              <Card.Title>
                <Text>{reply.bringer} is bringing...</Text>
              </Card.Title>
              <Card.Divider />
              <Text>
                {reply.bringing.map((bringItem, index) => {
                  return (
                    <Text>
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

  return (
    <View>
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
          <Card.Title>
            <Text>{potluck.potluckTitle}</Text>
          </Card.Title>
          <Card.Divider />

          <Text>Host: {potluck.potluckHost}</Text>
          <Text>Theme: {potluck.potluckTheme}</Text>
          <Text>
            Essentials:
            {item.essentials.map((essential, index) => {
              return (
                <Text>
                  {" "}
                  {essential}
                  {index < potluck.essentials.length - 2 ? ", " : ""}
                  {index === potluck.essentials.length - 2 ? " and " : ""}
                </Text>
              );
            })}
          </Text>
          <Reply />
        </Card>
      </TouchableOpacity>
    </View>
  );
}
