import { Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/login';
import Register from './components/register';
import Home from './components/home';

import EditUser from './components/editUser';
import ForgotPassword from './components/forgotPass';
import UniquePokemon from './components/uniquePokemon';

const Stack = createNativeStackNavigator();

function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }} />

        <Stack.Screen
          name='Register'
          component={Register}
          options={{ title: "register" }} />

        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: "home" }} />

        <Stack.Screen
          name='EditUser'
          component={EditUser}
          options={{ title: "edit user" }} />

        <Stack.Screen
          name='ForgotP'
          component={ForgotPassword}
          options={{ title: "recuperar contraseña" }} />

        <Stack.Screen
          name='UniquePokemon'
          component={UniquePokemon}
          options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App



