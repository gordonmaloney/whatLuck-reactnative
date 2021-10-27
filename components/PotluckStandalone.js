import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  RefreshControl,
  SafeAreaView,
  Button,
  Share,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { useDispatch } from "react-redux";
import { Card } from "react-native-elements";
import Bringing from "./Bringing";
import { updatePotluck } from "../actions/potlucks";
import { render } from "react-dom";
import { StyleSheet } from "react-native";
import Snackbar from "react-native-snackbar-component";
import { Swipeable, FlatList, ScrollView } from "react-native-gesture-handler";
import { RaisedTextButton } from "react-native-material-buttons";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

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

  const [potluckSnackIsVisible, setPotluckSnackIsVisible] = useState(false);
  const [replySnackVisible, setReplySnackVisible] = useState(false);

  React.useEffect(() => {
    props.route.params.success
      ? setPotluckSnackIsVisible(true)
      : setPotluckSnackIsVisible(false);
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Join me for a potluck | whatLuck https://whatluck.netlify.app/potlucks/${potluck.idCode}`,
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

  const setReplySnack = () => setReplySnackVisible(true);

  const Reply = () => {
    return (
      <View nestedScrollEnabled={true}>
        <FlatList
          nestedScrollEnabled={true}
          keyExtractor={(item, index) => index}
          data={potluck.replies}
          //style={styles.flatlist}
          renderItem={({ item }) => (
            <View nestedScrollEnabled={true}>
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
                <Card.Title>{item.bringer} is bringing...</Card.Title>
                <Card.Divider />
                {item.bringing.map((bringItem, index) => {
                  return (
                    <Text key={`reply-${index}`}>
                      {bringItem}
                      {index < item.bringing.length - 2 ? ", " : ""}
                      {index === item.bringing.length - 2 ? " and " : ""}
                    </Text>
                  );
                })}
              </Card>
            </View>
          )}
        />
      </View>
    );
  };

  if (!potluck) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View
        nestedScrollEnabled={true}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ImageBackground
          source={require("../images/background.png")}
          style={{ width: "100%", height: "100%", alignItems: "center" }}
        >
          <ScrollView
            horizontal={false}
            nestedScrollEnabled={true}
            style={styles.page}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Swipeable>
            <TouchableOpacity activeOpacity={1}>
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

                <RaisedTextButton  color="#3f51b5" onPress={onShare} title="Invite your friends" />

                <Text>Host: {potluck.potluckHost}</Text>
                <Text>Theme: {potluck.potluckTheme}</Text>
                <Text>
                  Essentials:
                  {potluck.essentials.map((essential, index) => {
                    return (
                      <Text key={index}>
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

              <Bringing
                potluck={potluck}
                setReplySnack={() => setReplySnack(true)}
              />
            </TouchableOpacity>
            </Swipeable>
          </ScrollView>

          <Snackbar
            visible={potluckSnackIsVisible}
            textMessage="Potluck created successfully!"
            autoHidingTime={3000}
          />
          <Snackbar
            visible={replySnackVisible}
            textMessage="Reply posted successfully!"
            autoHidingTime={3000}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    width: "90%",
    paddingTop: 50,
    paddingBottom: 50,
  },
});
