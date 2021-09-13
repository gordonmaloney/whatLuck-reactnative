import React from 'react';
import { SpeedDial } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const SpeedDialMenu = () => {
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation();

  return (
    <SpeedDial
      isOpen={open}
      icon={{ name: 'plus', type: "font-awesome", color: '#fff' }}
      openIcon={{ name: 'minus', type: "font-awesome", color: '#fff' }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
      color="blue"
    >
      <SpeedDial.Action
        icon={{ name: 'home', type: "font-awesome", color: '#fff' }}
        title="Home"
        onPress={() => {navigation.navigate('Home'); setOpen(!open)}}
        color="blue"
      />
    <SpeedDial.Action
        icon={{ name: 'pencil', type: "font-awesome", color: '#fff' }}
        title="Create"
        onPress={() => {navigation.navigate('Create Potluck'); setOpen(!open)}}
        color="blue"
      />
      <SpeedDial.Action
        icon={{ name: 'list', type: "font-awesome", color: '#fff' }}
        title="list"
        onPress={() => {navigation.navigate('Potluck List'); setOpen(!open)}}
        color="blue"
      />
    </SpeedDial>
  );
};

export default SpeedDialMenu