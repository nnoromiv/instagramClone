import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Welcome, Register, Home, CreatePost, StoryView, Messenger, Chat } from './screens';

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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='Register' component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeStack: React.FC = () => {
  const theme = {
    ...DefaultTheme,
    // Your custom theme configurations go here
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="StoryView" component={StoryView} />
        <Stack.Screen name="Messenger" component={Messenger} />
        <Stack.Screen name="Chat" component={Chat} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


export { AuthStack, HomeStack };
