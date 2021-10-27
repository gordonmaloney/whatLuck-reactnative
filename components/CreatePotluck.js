import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";
import { TextField } from "rn-material-ui-textfield";
import { CheckBox } from "react-native-elements";
import randomWords from "random-words";
import { createPotluck } from "../actions/potlucks";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-elements";
import ReactChipsInput from "react-native-chips"; //note that I tweaked this great package to use material ui textfield, rather than react native text input
import { Button } from 'react-native-paper';


import * as Haptics from "expo-haptics";

export default function CreatePotluck() {
  const potlucks = useSelector((state) => state.potlucks);

  const navigation = useNavigation();

  const [potluckData, setPotluckData] = useState({
    potluckHost: "",
    potluckTitle: "",
    potluckTheme: "",
    essentials: [],
    idCode: randomWords(3).join("-"),
    private: false,
    errMessHost: false,
    errMessTitle: false,
  });

  const dispatch = useDispatch();

  const handleSubmit = (potluckData) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    dispatch(createPotluck(potluckData));

    //reset form
    setPotluckData({
      ...potluckData,
      potluckHost: "",
      potluckTitle: "",
      potluckTheme: "",
      essentials: [],
      private: false,
      errMessHost: false,
      errMessTitle: false,
    });

    //redirect to new potluck
    navigation.navigate("Potluck", {
      idCode: potluckData.idCode,
      success: true
    });
  };

  return (
    <ImageBackground
      source={require("../images/background.png")}
      style={{ width: "100%", height: "100%", alignItems: "center", }}
    >
      <View style={styles.container}>
        <Card
          containerStyle={{ borderRadius: 12, borderWidth: 1, elevation: 0, backgroundColor: 'rgba(255,255,255,0.6)', overflow: 'hidden' }}
          style={{borderColor: 'rgba(255,255,255,0.1)'}}
        >
                              <Text style={{fontSize: 25, fontFamily: 'NotoSans_700Bold'}}>
Create a Potluck</Text>
          <Card.Divider />

          <View>
            <TextField
              label="Title *"
              value={potluckData.potluckTitle}
              onChangeText={(e) =>
                setPotluckData({
                  ...potluckData,
                  potluckTitle: e,
                  errMessTitle: false,
                })
              }
            />

            <TextField
              label="Host *"
              value={potluckData.potluckHost}
              onChangeText={(e) =>
                setPotluckData({
                  ...potluckData,
                  potluckHost: e,
                  errMessHost: false,
                })
              }
            />

            <TextField
              label="Theme"
              value={potluckData.potluckTheme}
              onChangeText={(e) =>
                setPotluckData({
                  ...potluckData,
                  potluckTheme: e,
                })
              }
            />

            {/*
        <Input
          placeholder="Essentials"
          onBlur={() => {}}
          value={potluckData.essentials}
          onChangeText={(e) =>
            setPotluckData({ ...potluckData, essentials: e })
          }
        />
        */}

            <ReactChipsInput
              label="Essentials"
              initialChips={potluckData.essentials}
              onChangeChips={(chips) =>
                setPotluckData({ ...potluckData, essentials: chips })
              }
              chipStyle={{
              }}
              inputStyle={{
                fontSize: 16,
                marginBottom: 0,
                paddingLeft: 0,
                height: 24,
                paddingBottom: 0,
                marginTop: 0,
              }}
              labelStyle={{ paddingLeft: 0, color: "grey" }}
              labelOnBlur={{ color: "rgb(0, 145, 234)", fontSize: 13 }}
            />

            <CheckBox
              title="Private?"
              checked={potluckData.private}
              containerStyle={{
                backgroundColor: "transparent",
                borderWidth: 0,
                paddingLeft: 0,
              }}
              onPress={() =>
                setPotluckData({
                  ...potluckData,
                  private: !potluckData.private,
                })
              }
            />

            {potluckData.errMessHost === true ||
            potluckData.errMessTitle === true ? (
              <Text style={{fontSize: 14, color: "red", fontFamily: 'Montserrat_400Regular', marginBottom: 8}}>You must enter a host and a title</Text>
            ) : (
              <View></View>
            )}

            {potluckData.potluckHost && potluckData.potluckTitle ? (
              <Button mode="contained" uppercase={false}
                onPress={() => {
                  handleSubmit(potluckData);
                }}>Submit</Button>
            ) : (
              <Button mode="contained" uppercase={false}
                color="#3f51b5"
                onPress={(e) =>
                  potluckData.potluckHost === "" ? (
                    setPotluckData({ ...potluckData, errMessHost: true })
                  ) : potluckData.potluckTitle === "" ? (
                    setPotluckData({ ...potluckData, errMessTitle: true })
                  ) : (
                    <></>
                  )
                }>Submit</Button>
            )}
          </View>
        </Card>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    justifyContent: 'center',
  },
  chipinput: {
    height: 100,
  },
});
