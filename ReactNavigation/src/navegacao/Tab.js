import React from 'react' 
import TelaA from '../views/TelaA'
import TelaB from '../views/TelaB'
import TelaC from '../views/TelaC'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import PassoStack from '../components/PassoStack'

const Tab = createBottomTabNavigator()

export default props => (
    <Tab.Navigator screenOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'blue',
        labelStyle: {fontSize: 30}
    }}>
        <Tab.Screen name="telaA" component={TelaA}/>
        <Tab.Screen name="telaB" component={TelaB}/>
        <Tab.Screen name="telaC" component={TelaC}/>
    </Tab.Navigator>
)