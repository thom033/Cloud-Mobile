import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screen/Login'; // Votre écran de connexion
import ImportFileScreen from './src/screen/ImportFile'; // L'écran que vous voulez afficher après une connexion réussie

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ImportFile" component={ImportFileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
