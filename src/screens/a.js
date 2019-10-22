import React from 'react';
import {CenterView} from '../containers/common';

const A = props => {
  const {goToScreenB, onNext} = props;
  console.log('rendering A. Props: ', Object.keys(props));
  console.log('screenProps', props.screenProps);
  return (
    <CenterView
      letter="A"
      goTo={() => (onNext ? onNext() : goToScreenB())}
      goToLetter={onNext ? 'onNext' : 'B'}
    />
  );
};

export default A;
