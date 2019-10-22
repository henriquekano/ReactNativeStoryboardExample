import React from 'react'
import {View, Text, Button} from 'react-native';

const CenterView = props => {
  console.log(props);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 40}}>{props.letter}</Text>
      <Button title={props.goToLetter} onPress={props.goTo} />
    </View>
  );
};

export default CenterView;
