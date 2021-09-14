import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import ReactChipsInput from "react-native-chips"; //note that I tweaked this great package to use material ui textfield, rather than react native text input
import { Input, CheckBox } from "react-native-elements";
import { Card } from "react-native-elements/";
import { updatePotluck } from "../actions/potlucks";
import { TextField } from "rn-material-ui-textfield";
import * as Haptics from 'expo-haptics'
export default function Bringing({potluck}) {

    const [bringerData, setBringerData] = useState({
    bringer: "",
    bringing: "",
    errMessBringer: false,
    errMessBringing: false,
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    console.log(potluck)

    potluck.replies = [...potluck.replies, bringerData];

    console.log(potluck);

    dispatch(updatePotluck(potluck._id, potluck));

    //reset form
    setBringerData({ bringer: "", bringing: [], errMessBringer: false, errMessBringing: false})
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

  };

  return (
    <View>
      <Card>
          <Card.Title>What are you bringing?</Card.Title>
        <Card.Divider />


        <TextField
          label="Bringer *"
          value={bringerData.bringer}
          onChangeText={(e) =>
            setBringerData({
              ...bringerData,
              bringer: e,
              errMessBringer: false,
            })
          }
          />

     

<ReactChipsInput
          label="Bringing *"
          initialChips={bringerData.bringing}
          onChangeChips={(e) =>
            setBringerData({
              ...bringerData,
              bringing: e,
              errMessBringing: false,
            })
          }
          chipStyle={{ borderColor: "white", backgroundColor: "rgb(0, 145, 234)" }}
          inputStyle={{ fontSize: 16, marginBottom: 0, paddingLeft: 0, height: 24, paddingBottom: 0, marginTop: 0 }}
          labelStyle={{ paddingLeft: 0, color: "grey"}}
          labelOnBlur={{ color: 'rgb(0, 145, 234)', fontSize: 13 }}
        />

        <Button
          onPress={() => {
            handleSubmit(potluck.potluck, bringerData);
          }}
          title="Submit"
        />
      </Card>
    </View>
  );
}
