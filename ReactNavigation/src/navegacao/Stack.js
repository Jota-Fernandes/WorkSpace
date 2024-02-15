import React from 'react' 
import TelaA from '../views/TelaA'
import TelaB from '../views/TelaB'
import TelaC from '../views/TelaC'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator()

export default props => (
    <Stack.Navigator initialRouteName='TelaA'
        screenOptions={{headerShown: true}}>
        <Stack.Screen name="TelaA" 
            options={{title: 'A'}}
            component={TelaA}
        />
        <Stack.Screen name="TelaB" component={TelaB}/>
        <Stack.Screen name="TelaC" component={TelaC}/>
    </Stack.Navigator>
)