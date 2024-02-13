import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome } from './screens';

type AuthStackProps = {};

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const AuthStack: React.FC<AuthStackProps> = () => {
  const theme = {
    ...DefaultTheme,
    // Your custom theme configurations go here
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={screenOptions}>
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { AuthStack };
