import React from 'react';
import {CenterView} from '../containers/common';

const C = ({goToFlow2, onNext}) => {
  console.log('rendering A', goToFlow2, onNext);
  return (
    <CenterView
      letter="C"
      goTo={() => onNext ? onNext() : goToFlow2()}
      goToLetter={onNext ? 'onNext' : 'flow2'}
    />
  )
}

export default C;
