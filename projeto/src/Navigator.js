import * as React from 'react';
import { NavigationContainer

 } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddPhoto from './screens/AddPhoto';
import Feed from './screens/Feed';
import Profile from './screens/Profile';
import Login from './screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './screens/Register';

const Tab = createBottomTabNavigator();
const authRouter = createStackNavigator()

export default function App() {

    function HomeTabs() {
        return (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                
                if (route.name === 'Feed') {
                    iconName = 'home';}
                else if (route.name === 'AddPhoto') {
                  iconName = 'camera';
                } else if (route.name === 'Profile') {
                  iconName = 'user';
                }
      
                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              showLabel: false,
            })}
              
          >
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="AddPhoto" component={AddPhoto} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        );
      }

    return (
            <NavigationContainer>
                <authRouter.Navigator initialRouteName="Login">
                    <authRouter.Screen name="Login" component={Login} />
                    <authRouter.Screen name="Register" component={Register} />
                    <authRouter.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
                </authRouter.Navigator>
            </NavigationContainer>
        )}
       
