import React from 'react';
import { SpeedDial } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const SpeedDialMenu = () => {
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation();

  return (
    <SpeedDial
      isOpen={open}
      icon={{ name: 'edit', color: '#fff' }}
      openIcon={{ name: 'close', color: '#fff' }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
    >
      <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title="Home"
        onPress={() => navigation.navigate('Home')}
      />
    <SpeedDial.Action
        icon={{ name: 'delete', color: '#fff' }}
        title="Create"
        onPress={() => navigation.navigate('CreatePotluck')}
      />
      <SpeedDial.Action
        icon={{ name: 'delete', color: '#fff' }}
        title="list"
        onPress={() => navigation.navigate('PotluckList')}
      />
    </SpeedDial>
  );
};

export default SpeedDialMenu