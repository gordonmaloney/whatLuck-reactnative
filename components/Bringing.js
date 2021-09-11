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
import ReactChipsInput from "react-native-chips";
import { Input, CheckBox } from "react-native-elements";
import { Card } from "react-native-elements/dist/card/Card";
import { updatePotluck } from "../actions/potlucks";

export default function Bringing(potluck) {

console.log(potluck)

    const [bringerData, setBringerData] = useState({
    bringer: "",
    bringing: "",
    errMessBringer: false,
    errMessBringing: false,
  });
  const dispatch = useDispatch();

  const handleSubmit = (potluck, bringerData) => {
    potluck.replies = [...potluck.replies, bringerData];

    console.log(potluck);

    dispatch(updatePotluck(potluck._id, potluck));

    //reset form
    //setBringerData({ bringer: "", bringing: [], errMessBringer: false, errMessBringing: false, });
  };

  return (
    <View>
      <Card>

        <Input
          placeholder="Bringer"
          onBlur={() => {}}
          value={bringerData.bringer}
          onChangeText={(e) =>
            setBringerData({
              ...bringerData,
              bringer: e,
              errMessBringer: false,
            })
          }
        />

        <Input
          placeholder="Bringing"
          onBlur={() => {}}
          value={bringerData.bringing}
          onChangeText={(e) =>
            setBringerData({
              ...bringerData,
              bringing: e,
              errMessBringing: false,
            })
          }
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
