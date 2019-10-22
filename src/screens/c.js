import React from 'react';
import {Button, View} from 'react-native';
import {CenterView} from '../containers/common';

const C = props => {
  const {goToFlow2, onNext} = props;
  console.log('rendering C. Props', Object.keys(props));
  console.log('screenProps', props.screenProps);
  return (
    <View style={{ flex: 1 }}>
      <CenterView
        letter="C"
        goTo={() => (onNext ? onNext() : goToFlow2())}
        goToLetter={onNext ? 'onNext' : 'flow2'}
      />
      {props.screenProps ? (
        <Button
          title="set email"
          onPress={() => props.screenProps.setEmail('qwe@qwe.com')}
        />
      ) : null}
    </View>
  );
};

export default C;
