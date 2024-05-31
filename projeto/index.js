/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import MenuNavigator from './src/Navigator';
import {name as appName} from './app.json';

import storeConfig from './src/store/storeConfig';

const store = storeConfig()
const Redux = () => (
    <Provider store={store}>
        <MenuNavigator/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
