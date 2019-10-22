import React from 'react';
import {Button} from 'react-native';
import {CenterView} from '../containers/common';

const B = props => {
  const {goToFlow1, onNext} = props;
  console.log('rendering B. Props: ', Object.keys(props));
  console.log('screenProps', props.screenProps);
  return (
    <>
      <CenterView
        letter="B"
        goTo={() => (onNext ? onNext() : goToFlow1())}
        goToLetter={onNext ? 'onNext' : 'flow1'}
      />
      {props.screenProps ? (
        <Button
          title="set email"
          onPress={() => props.screenProps.setEmail('qwe@qwe.com')}
        />
      ) : null}
    </>
  );
};

export default B;
