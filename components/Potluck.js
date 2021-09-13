import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { Card } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PotluckStandalone from "./PotluckStandalone";

export default function Potluck({ item }) {
  const potluck = item;
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Potluck", {
            idCode: potluck.idCode,
          })
        }
      >
        <Card>
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
        </Card>
      </TouchableOpacity>
    </View>
  );
}
