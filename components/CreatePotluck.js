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
import { Formik } from "formik";
import ReactChipsInput from "react-native-chips";
//import { TextField } from 'rn-material-ui-textfield';
import { Input, CheckBox } from "react-native-elements";
import randomWords from "random-words";
import { createPotluck } from "../actions/potlucks";
import { useNavigation } from "@react-navigation/native";

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
    console.log(potluckData);
    dispatch(createPotluck(potluckData));

    //reset form
    setPotluckData({ ...potluckData, potluckHost: "", potluckTitle: "", potluckTheme: "", essentials: [], private: false, errMessHost: false, errMessTitle: false })

    //redirect to new potluck
    navigation.navigate("YourNewPotluck", { 
      idCode: potluckData.idCode,
    })
  };

  return (
    <View style={styles.container}>
      <Text>Create a Potluck</Text>

      <View>
        <Input
          placeholder="Title"
          onBlur={() => {}}
          value={potluckData.potluckTitle}
          onChangeText={(e) =>
            setPotluckData({
              ...potluckData,
              potluckTitle: e,
              errMessTitle: false,
            })
          }
        />
        <Input
          placeholder="Host"
          onBlur={() => {}}
          value={potluckData.potluckHost}
          onChangeText={(e) =>
            setPotluckData({
              ...potluckData,
              potluckHost: e,
              errMessHost: false,
            })
          }
        />
        <Input
          placeholder="Theme"
          onBlur={() => {}}
          value={potluckData.potluckTheme}
          onChangeText={(e) =>
            setPotluckData({ ...potluckData, potluckTheme: e })
          }
        />

        <Input
          placeholder="Essentials"
          onBlur={() => {}}
          value={potluckData.essentials}
          onChangeText={(e) =>
            setPotluckData({ ...potluckData, essentials: e })
          }
        />

        {/*
< ReactChipsInput 
    label="Essentials" initialChips={[]} 
    //onChangeChips={(chips) => console.log(chips)} 
    alertRequired={false} 
    chipStyle={{ borderColor: 'blue', backgroundColor: 'blue' }} 
    inputStyle={{fontSize: 14}} 
    labelStyle={{ color: 'grey', fontSize: 14, padding: 0}} 
    labelOnBlur={{ color: '#666' }} 
    //value={potluckData.essentials}
    onChangeChips={(chips) => setPotluckData({ ...potluckData, essentials: chips })}

    />
*/}

        <CheckBox
          title="Private?"
          checked={potluckData.private}
          onPress={() =>
            setPotluckData({ ...potluckData, private: !potluckData.private })
          }
        />

        <Button
          onPress={() => {
            handleSubmit(potluckData);
          }}
          title="Submit"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    paddingTop: 20,
  },
  chipinput: {
    height: 100,
  },
});
