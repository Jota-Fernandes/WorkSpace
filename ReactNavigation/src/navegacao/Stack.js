import React from 'react' 
import TelaA from '../views/TelaA'
import {createStackNavigator} from '@react-navigation/native-stack'

const Stack = createStackNavigator()

export default props => (
    <Stack.Navigator>
        <Stack.Screen name="TelaA" component={TelaA}/>
    </Stack.Navigator>
)