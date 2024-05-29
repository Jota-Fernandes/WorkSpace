/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Feed from './src/screens/Feed'
import MenuNavigator from './src/Navigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MenuNavigator);
