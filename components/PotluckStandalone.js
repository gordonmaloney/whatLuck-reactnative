import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ScrollView, View, Text, FlatList, RefreshControl, SafeAreaView, Button, Share } from "react-native";
import { useDispatch } from "react-redux";
import { Card } from "react-native-elements";
import Bringing from './Bringing'
import { updatePotluck } from "../actions/potlucks";
import { render } from "react-dom";
import { StyleSheet } from "react-native";

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

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `Join me for a potluck | whatLuck https://whatluck.netlify.app/potlucks/${potluck.idCode}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };



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
            style={styles.page}
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

        <Button onPress={onShare} title="Invite your friends" />


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

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'lightblue'
  }

})