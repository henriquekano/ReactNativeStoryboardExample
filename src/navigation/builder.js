import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import * as R from 'ramda';
import {fromRight} from './transitionAnimations';

// interface Flow {
//   name: string,
//   screens: JSX.Element[],
// }

// type HomeTypes = 'bottomTab' | 'topTab'
// interface Home {
//   type: HomeTypes,
//   screens: string,
// }

// interface Screen {
//   name: string,
//   screen: JSX.Element,
// }

// interface Edge {
//   from: string,
//   to: string,
//   identifier: string,
// }

const _generateFlowRoute = (flowName, step) => `Flow{${flowName}}Step{${step}}`;

const _extractFlowNameAndStepFromFlowRoute = flowRoute => {
  const matches = flowRoute.match(/Flow{(.+)}Step{(.+)}/);
  return {
    flow: matches[1],
    step: parseInt(matches[2], 10),
  };
};

const _generateHomeRoute = (screenName, step) =>
  `HomeScreen{${screenName}}Step{${step}}`;

const _extractHomeNameAndStepFromHomeRoute = homeRouteName => {
  const matches = homeRouteName.match(/HomeScreen{(.+)}Step{(.+)}/);
  return {
    screenName: matches[1],
    step: parseInt(matches[2], 10),
  };
};

const _getScreenWithName = (screenName, screens) =>
  screens.filter(R.propEq('name', screenName))[0];

const _getCurrentRouteName = navigation => navigation.state.routeName;

const useAndroidBackEffect = handler => {
  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', handler);
    return () => listener.remove();
  });
};

const withFlowNavigationDeciderHoC = (WrappedComponent, flows) => ({
  navigation,
  ...otherProps
}) => {
  const currentRoute = _getCurrentRouteName(navigation);
  const flowParameters = _extractFlowNameAndStepFromFlowRoute(currentRoute);
  const flowDefinition = R.filter(R.propEq('name', flowParameters.flow))(
    flows,
  )[0];
  const flowLength = flowDefinition.screens.length;
  const flowNavigationType = flowDefinition.navigationType;
  let onBack = () => navigation.goBack();
  if (flowNavigationType === 'oneWay') {
    onBack = () => navigation.dismiss();
  }
  let onNext = () => {
    const nextRoute = _generateFlowRoute(
      flowParameters.flow,
      flowParameters.step + 1,
    );
    navigation.navigate(nextRoute);
  };
  const isInTheLastFlowStep = flowParameters.step === flowLength - 1;
  const isInTheFirstFlowStep = flowParameters.step === 0;
  if (isInTheLastFlowStep) {
    onNext = () => navigation.dismiss();
  }
  if (isInTheFirstFlowStep) {
    onBack = () => navigation.dismiss();
  }

  useAndroidBackEffect(onBack);
  return <WrappedComponent onNext={onNext} onBack={onBack} {...otherProps} />;
};

const withRootNavigationDeciderHoC = (WrappedComponent, edges, flows) => ({
  navigation,
  ...otherProps
}) => {
  const currentRouteName = _getCurrentRouteName(navigation);
  const currentRouteEdges = R.filter(R.propEq('from', currentRouteName))(edges);
  const navigationProps = {};
  currentRouteEdges.forEach(edge => {
    navigationProps[edge.identifier] = () => {
      navigation.push(edge.to);
    };
  });

  useAndroidBackEffect(() => navigation.pop());
  return (
    <WrappedComponent
      {...navigationProps}
      {...otherProps}
      navigation={navigation}
    />
  );
};

const withHomeNavigationDeciderHoC = (WrappedComponent, edges, flows) => ({
  navigation,
  ...otherProps
}) => {
  const currentRouteName = _getCurrentRouteName(navigation);
  const extractedHomeRoute = _extractHomeNameAndStepFromHomeRoute(
    currentRouteName,
  );
  const currentRouteEdges = R.filter(
    R.propEq('from', extractedHomeRoute.screenName),
  )(edges);
  const navigationProps = {};
  currentRouteEdges.forEach(edge => {
    navigationProps[edge.identifier] = () => {
      navigation.push(edge.to);
    };
  });

  useAndroidBackEffect(() => navigation.pop());
  return (
    <WrappedComponent
      {...navigationProps}
      {...otherProps}
      navigation={navigation}
    />
  );
};

const createBuilders = (home, edges, flows, screens) => {
  const buildFlowNavigators = () => {
    const returnValue = [];
    flows.forEach(flow => {
      const resultScreens = {};
      flow.screens.forEach((screenName, index) => {
        const {screen} = _getScreenWithName(screenName, screens);
        resultScreens[
          _generateFlowRoute(flow.name, index)
        ] = withFlowNavigationDeciderHoC(screen, flows);
      });

      returnValue.push({
        flowName: flow.name,
        stack: createStackNavigator(resultScreens, {
          initialRouteName: _generateFlowRoute(flow.name, 0),
          transitionConfig: () => fromRight(),
          defaultNavigationOptions: {
            header: null,
          },
        }),
      });
    });

    return returnValue;
  };

  const buildHomeNavigator = () => {
    const resultScreens = {};
    home.screens.forEach((screenName, index) => {
      const {screen} = screens.filter(R.propEq('name', screenName))[0];
      resultScreens[
        _generateHomeRoute(screenName, index)
      ] = withHomeNavigationDeciderHoC(screen, edges);
    });
    return createBottomTabNavigator(resultScreens);
  };

  return {
    buildFlowNavigators,
    buildHomeNavigator,
  };
};

const buildNavigationScheme = (home, screens, flows, edges) => {
  const {buildFlowNavigators, buildHomeNavigator} = createBuilders(
    home,
    edges,
    flows,
    screens,
  );
  const homeNavigator = buildHomeNavigator();
  const mainStack = {
    main: homeNavigator,
  };

  const flowNavigators = buildFlowNavigators();
  flowNavigators.forEach(flowNavigator => {
    mainStack[flowNavigator.flowName] = flowNavigator.stack;
  });

  screens.forEach(({screen, name}) => {
    mainStack[name] = withRootNavigationDeciderHoC(screen, edges, flows);
  });

  return createStackNavigator(mainStack, {
    initialRouteName: 'main',
    defaultNavigationOptions: {
      header: null,
    },
  });
};

export {buildNavigationScheme};
