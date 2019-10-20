## Interface
```js
import {AppRegistry} from 'react-native';
import {buildNavigationScheme} from './builder';

const screens = [
    {
        name: 'route1',
        screen: Screen1,
    },
    {
        name: 'route2',
        screen: Screen2,
    },
]

const flow = [
    {
        name: 'flow1',
        screens: [Screen1, Screen2],
    }
]

const edges = [
    {
        from: 'route1',
        to: 'route2',
        identifier: 'goToRoute2',
    },
    {
        from: 'route2',
        to: 'flow1',
        identifier: 'goToRoute2',
    },
    {
        from: 'flow1',
        to: 'route1',
        identifier: 'goToRoute2',
    },
]

const home = {
    type: 'bottomTabs',
    screens: [Screen1, Screen2],
}

const app = createAppContainer(buildNavigationScheme(home, screens, flows, edges);

AppRegistry.registerComponent(appName, () => app);
```