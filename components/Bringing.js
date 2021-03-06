import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
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
import * as Haptics from "expo-haptics";
import Snackbar from 'react-native-snackbar-component';
import { Button } from 'react-native-paper';

export default function Bringing({ potluck, setReplySnack }) {
  const [bringerData, setBringerData] = useState({
    bringer: "",
    bringing: "",
    errMessBringer: false,
    errMessBringing: false,
  });
  const dispatch = useDispatch();

      //check duplicates
      var allReplies = [];
      potluck.replies.map((reply) =>
        reply.bringing.map((bring) => allReplies.push(bring.toLowerCase()))
      ); 
      const [duplicates, setDuplicates] = useState([]);

      const [posted, setPosted] = useState(false);


      const [snackIsVisible, setSnackIsVisible] = useState(false);

  const handleSubmit = (e) => {
    potluck.replies = [...potluck.replies, bringerData];

    console.log(potluck);

    dispatch(updatePotluck(potluck._id, potluck));

    //reset form
    setBringerData({
      bringer: "",
      bringing: [],
      errMessBringer: false,
      errMessBringing: false,
    });

    setReplySnack()

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };


  //check duplicates function 
  const checkDuplicate = (e) => {
    let duplicatesList = [];

    e.map((item) =>
      allReplies.includes(item.toLowerCase())
        ? duplicatesList.push(item.toLowerCase())
        : console.log("ok")
    );

    const uniqueDuplicates = [...new Set(duplicatesList)];
    setDuplicates(uniqueDuplicates);
  };

  return (
    <View>
      <Card
        containerStyle={{
          borderRadius: 12,
          borderWidth: 1,
          elevation: 0,
          backgroundColor: "rgba(255,255,255,0.6)",
          overflow: "hidden",
          marginBottom: 150
        }}
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
                    <Text style={{fontSize: 20, fontFamily: 'NotoSans_700Bold'}}>
What are you bringing?</Text>
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
            {setBringerData({
              ...bringerData,
              bringing: e,
              errMessBringing: false,
            }); checkDuplicate(e);}
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

        {duplicates.length > 0 ? (
        <Text style={{fontSize: 14, color: "red", fontFamily: 'Montserrat_400Regular', marginBottom: 8}}>
          Heads up! Someone is already bringing
          {duplicates.map((duplicate, index) => {
            return (
              <>
                {" "}
                {duplicate}
                {index < duplicates.length - 2 ? ", " : ""}
                {index === duplicates.length - 2 ? " and " : ""}
              </>
            );
          })}
        </Text>
        ) : <View></View> }

        {bringerData.errMessBringer === true ||
        bringerData.errMessBringing === true ? (
          <Text  style={{fontSize: 14, color: "red", fontFamily: 'Montserrat_400Regular', marginBottom: 8}}>You must enter your name and say what you're bringing!</Text>
        ) : (
          <View></View>
        )}
        {bringerData.bringer && bringerData.bringing ? (
          <Button mode="contained" uppercase={false}
            color="#3f51b5"
            onPress={() => {
              handleSubmit(potluck.potluck, bringerData);
            }}
          >
            Submit
            </Button>
        ) : (
          <Button
          mode="contained" uppercase={false}
            color="#3f51b5"
            title="Submit"
            onPress={() =>
              bringerData.bringer === ""
                ? setBringerData({ ...bringerData, errMessBringer: true })
                : bringerData.bringing === ""
                ? setBringerData({ ...bringerData, errMessBringing: true })
                : console.log("test")
            }
          >Submit</Button>
        )}
      </Card>

      <Snackbar
          visible={snackIsVisible}
          textMessage="Reply created successfully!"
          autoHidingTime={2000}
        />
    </View>
  );
}
