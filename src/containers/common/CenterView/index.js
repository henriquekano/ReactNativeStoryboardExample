import React from 'react'
import {View, Text, Button} from 'react-native';

const CenterView = ({letter, goTo, goToLetter}) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: 40}}>{letter}</Text>
    <Button title={goToLetter} onPress={goTo} />
  </View>
);

export default CenterView;
