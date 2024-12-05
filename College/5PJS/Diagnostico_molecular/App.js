import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/Login';
import LaboratoristaHomeScreen from './src/screens/Laboratorista';
import MedicoHomeScreen from './src/screens/Medico';
import UsuarioHomeScreen from './src/screens/Usuario';
import AdministradorHomeScreen from './src/screens/Administrador';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Laboratorista" component={LaboratoristaHomeScreen} options={{ title: 'Laboratorista' }} />
        <Stack.Screen name="Medico" component={MedicoHomeScreen} options={{ title: 'Médico' }} />
        <Stack.Screen name="Usuario" component={UsuarioHomeScreen} options={{ title: 'Usuário' }} />
        <Stack.Screen name="Administrador" component={AdministradorHomeScreen} options={{ title: 'Administrador' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
