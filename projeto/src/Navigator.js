import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddPhoto from './screens/AddPhoto';
import Feed from './screens/Feed';
import Profile from './screens/Profile';
import Login from './screens/Login';

const Tab = createBottomTabNavigator();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <Tab.Navigator
                    initialRouteName="Feed"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName;

                            if (route.name === 'Feed') {
                                iconName = 'home';
                            } else if (route.name === 'AddPhoto') {
                                iconName = 'camera';
                            } else if (route.name === 'Profile') {
                                iconName = 'user';
                            }

                            return <Icon name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'blue',
                        tabBarInactiveTintColor: 'gray',
                        showLabel: false,
                    })}
                >
                    <Tab.Screen name="Feed" component={Feed} />
                    <Tab.Screen name="AddPhoto" component={AddPhoto} />
                    <Tab.Screen name="Profile" component={Profile} />
                </Tab.Navigator>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </NavigationContainer>
    );
}
