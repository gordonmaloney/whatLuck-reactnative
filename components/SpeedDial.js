import React from 'react';
import { SpeedDial } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { StyleSheet } from "react-native";
import { Text } from 'react-native-elements';

const SpeedDialMenu = () => {
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation();

  return (
    <SpeedDial
      isOpen={open}
      icon={{ name: 'plus', type: "font-awesome", color: '#fff' }}
      openIcon={{ name: 'minus', type: "font-awesome", color: '#fff' }}
      onOpen={() => {setOpen(!open); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}}
      onClose={() => {setOpen(!open); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}}
      color="#3f51b5"
    >
      <SpeedDial.Action
        icon={{ name: 'home', type: "font-awesome", color: '#fff' }}
        title={<Text style={styles.menuicon}>Home</Text>}
        onPress={() => {navigation.navigate('Home'); setOpen(!open); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}}
        color="#3f51b5"
      />
    <SpeedDial.Action
        icon={{ name: 'pencil', type: "font-awesome", color: '#fff' }}
        title={<Text style={styles.menuicon}>Create a potluck</Text>}
        onPress={() => {navigation.navigate('Create Potluck'); setOpen(!open); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}}
        color="#3f51b5"
      />
      <SpeedDial.Action
        icon={{ name: 'list', type: "font-awesome", color: '#fff' }}
        title={<Text style={styles.menuicon}>All potlucks</Text>}
        style={styles.menuicon}
        onPress={() => {navigation.navigate('Potluck List'); setOpen(!open); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}}
        color="#3f51b5"
      />
    </SpeedDial>
  );
};

const styles = StyleSheet.create({
  menuicon: {
    fontFamily: 'NotoSans_400Regular'
  },
})

export default SpeedDialMenu