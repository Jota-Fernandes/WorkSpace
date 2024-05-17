import React from "react"
import {
    createBottomTabNavigator,
    createSwitchNavigator,
    createStackNavigator
} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import Profile from './screens/Profile'
import Feed from './screens/Feed'
import Login from "./screens/Login"
import Register from './screens/Register'

const authRouter = createStackNavigator({
    
})

const loginOrProfileRouter = createSwitchNavigator({
    Profile: Profile,
    Auth: Login
},{
    initialRouteName: 'Auth'
})

const MenuRoutes = {
    Feed: {
        name: 'Feed',
        screens: Feed,
        navigationOptions:{
            title: 'Feed',
            tabBarIcon: ({tintColor}) =>
                <Icon name='home' size={30} color={tintColor}/>
        }
    },
    Add: {
        name: 'AddPhoto',
        screens: Feed,
        navigationOptions: {
            title: 'Add Picture',
            tabBarIcon: ({tintColor}) =>
                <Icon name='camera' size={30} color={tintColor}/>
        }
    },
    Profile: {
        name: 'Profile',
        screens: loginOrProfileRouter,
        navigationOptions: {
            title: 'Profile',
            tabBarIcon: ({tintColor: color}) =>
                <Icon name='user' size={30} color={color}/>
        }
    }
}

const MenuConfig = {
    initialRouteName: 'Feed',
    tabBarOptions: {
        showLabel: false,
    }
}

const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig)
export default MenuNavigator