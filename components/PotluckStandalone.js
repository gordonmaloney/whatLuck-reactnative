import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ScrollView, View, Text, FlatList, RefreshControl, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { Card } from "react-native-elements";
import Bringing from './Bringing'
import { updatePotluck } from "../actions/potlucks";
import { render } from "react-dom";


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function PotluckStandalone(props) { 
  const potlucks = useSelector((state) => state.potlucks);
  const potluck = potlucks.find(
    ({ idCode }) => idCode === props.route.params.idCode
  );

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);



  const dispatch = useDispatch();

  



  const Reply = () => {
    return (
      <View>
        {potluck.replies.map((reply) => {
          return (
            <Card>
              <Card.Title>{reply.bringer} is bringing...</Card.Title>
              <Card.Divider />

              {reply.bringing.map((bringItem, index) => {
                  return (
                    <Text>{bringItem}{index < reply.bringing.length - 2 ? ", " : ""}{index === reply.bringing.length - 2 ? " and " : ""}</Text>
                  );
                })}

            </Card>
          );
        })}
      </View>
    );
  };

  if (!potluck) {
    return (
     <Text>Loading...</Text> 
    )
  } else {
  return (
            <ScrollView
            refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
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
          {potluck.essentials.map((essential, index) => {
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
        <Card.Divider />

        <Reply />
      </Card>

      <Bringing potluck={potluck}/>

    </ScrollView>
  
  );
}
}
