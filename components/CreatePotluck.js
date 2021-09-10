import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";

export default function CreatePotluck() {
  return (
    <View>
      <Text>Create a Potluck</Text>

      <Formik
        initialValues={{ title: "", host: "", theme: ""}}
        onSubmit={(values) => console.log(values)}
      >
        <View>
          <TextInput
            placeholder="Title"
            onChangeText={() => {}}
            onBlur={() => {}}
          />
          <TextInput
            placeholder="Host"
            onChangeText={() => {}}
            onBlur={() => {}}
          />
          <TextInput
            placeholder="Theme"
            onChangeText={() => {}}
            onBlur={() => {}}
          />
          <Button onPress={() => console.log("submitted")} title="Submit" />
        </View>
      </Formik>
    </View>
  );
}
