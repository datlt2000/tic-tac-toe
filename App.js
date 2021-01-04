import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import Game from './src/screens/Game';
import ComPlayer from './src/screens/ComPlayer';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' headerMode='none'>
        <Stack.Screen
          name='Home'
          component={Home} />
        <Stack.Screen
          name='2player'
          component={Game} />
        <Stack.Screen
          name='1player'
          component={ComPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};