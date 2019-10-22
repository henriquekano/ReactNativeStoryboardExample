import React, {PureComponent} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import * as R from 'ramda';

const capitalize = R.pipe(
  R.juxt([
    R.pipe(
      R.head,
      R.toUpper,
    ),
    R.tail,
  ]),
  R.join(''),
);

/**
 * @param {[{ name: string, initialValue: any }]} params params to save in the stack
 */
const createStatefullNavigator = (routeConfigMap, stackConfig, params) => {
  const OriginalStack = createStackNavigator(routeConfigMap, stackConfig);
  return class StatefulStackNavigator extends PureComponent {
    static router = OriginalStack.router;
    constructor(props) {
      super(props);
      this.state = {};
      console.log('yayyyy');
      params.forEach(param => {
        this.state[param.name] = param.initialValue;
      });
    }

    createSetProps = () => {
      const setProps = {
        rawSetState: newParams => this.setState(newParams),
      };
      params.forEach(param => {
        setProps[`set${capitalize(param.name)}`] = newValue =>
          this.setState({
            [param.name]: newValue,
          });
      });

      return setProps;
    };

    render = () => {
      const setProps = this.createSetProps();
      console.log(setProps);
      return (
        <OriginalStack
          navigation={this.props.navigation}
          screenProps={{...setProps, ...this.state}}
        />
      );
    };
  };
};

export {createStatefullNavigator};
