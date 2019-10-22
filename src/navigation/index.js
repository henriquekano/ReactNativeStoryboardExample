import {createAppContainer} from 'react-navigation';
import {buildNavigationScheme} from './builder';
import A from '../screens/a';
import B from '../screens/b';
import C from '../screens/c';

const screens = [
  {
    name: 'screenA',
    screen: A,
  },
  {
    name: 'screenB',
    screen: B,
  },
  {
    name: 'screenC',
    screen: C,
  },
];

const home = {
  type: 'bottomTab',
  screens: ['screenA', 'screenB', 'screenC'],
};

const flows = [
  {
    name: 'flow1',
    screens: ['screenA', 'screenB'],
    navigationType: 'oneWay', // one-way only
  },
  {
    name: 'flow2',
    screens: ['screenB', 'screenA'],
    params: [
      {
        name: 'email',
        initialValue: '',
      },
      {
        name: 'password',
        initialValue: '',
      },
    ],
  },
];

const edges = [
  {
    from: 'screenA',
    to: 'screenB',
    identifier: 'goToScreenB',
  },
  {
    from: 'screenB',
    to: 'flow1',
    identifier: 'goToFlow1',
  },
  {
    from: 'screenC',
    to: 'flow2',
    identifier: 'goToFlow2',
  },
];

const NavigationContainer = () =>
  createAppContainer(buildNavigationScheme(home, screens, flows, edges));

export {NavigationContainer};
