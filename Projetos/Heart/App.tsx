import Home from './src/screens/Home';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PasswrodsScreen from './src/screens/PasswordCenter';
import SignUp from './src/screens/SignUp';
import MainScreen from './src/screens/Main';
import SecurityCheckScreen from './src/screens/SecurityCheckScreen';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PasswordScreen" component={PasswrodsScreen}/>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="SecurityCheck" component={SecurityCheckScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}