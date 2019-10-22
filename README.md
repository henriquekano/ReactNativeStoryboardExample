## Interface
```js
import {AppRegistry} from 'react-native';
import {buildNavigationScheme} from './builder';

// Names should be unique

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
        screens: ['route1', 'route2'],
        // optional
        // adding a param makes available for the screens:
        // props.screenProps: { setParam, param, rawSetState }
        params: [
            {
                name: 'email',
                initialValue: '',
            }
        ],
    }
]

// These will be available to the screen, regardles
// of the situation (being in a flow, in the home, etc)
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
]

const home = {
    type: 'bottomTabs',
    screens: ['route1', 'route2'],
}

const app = createAppContainer(buildNavigationScheme(home, screens, flows, edges);

AppRegistry.registerComponent(appName, () => app);
```