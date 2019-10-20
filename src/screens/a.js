import React from 'react';
import {CenterView} from '../containers/common';

const A = ({goToScreenB, onNext}) => {
  console.log('rendering A', goToScreenB, onNext);
  return (
    <CenterView
      letter="A"
      goTo={() => onNext ? onNext() : goToScreenB()}
      goToLetter={onNext ? 'onNext' : 'B'}
    />
  )
}

export default A;
