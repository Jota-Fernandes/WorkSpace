import React from 'react' 
import TelaA from '../views/TelaA'
import TelaB from '../views/TelaB'
import TelaC from '../views/TelaC'
import {createStackNavigator} from '@react-navigation/stack'
import PassoStack from '../components/PassoStack'

const Stack = createStackNavigator()

export default props => (
    <Stack.Navigator initialRouteName='TelaA'
        screenOptions={{headerShown: true}}>
        <Stack.Screen name="TelaA" 
            options={{title: 'A'}}>
                {props => (
                    <PassoStack {...props} avancar="TelaB">
                        <TelaA/>
                    </PassoStack>
                )}
            </Stack.Screen>
        <Stack.Screen name="TelaB">
                {props => (
                    <PassoStack {...props} avancar="TelaC">
                        <TelaB/>
                    </PassoStack>
                )}
        </Stack.Screen>
        <Stack.Screen name="TelaC" component={TelaC}/>
    </Stack.Navigator>
)