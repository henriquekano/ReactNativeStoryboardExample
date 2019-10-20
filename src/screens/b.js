import React from 'react';
import {CenterView} from '../containers/common';

const B = ({goToFlow1, onNext}) => {
  console.log('rendering B', goToFlow1, onNext);
  return (
    <CenterView
      letter="B"
      goTo={() => onNext ? onNext() : goToFlow1()}
      goToLetter={onNext ? 'onNext' : 'flow1'}
    />
  )
}

export default B;
