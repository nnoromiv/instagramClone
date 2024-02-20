/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Screen from './Screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const backgroundStyle = "bg-neutral-300 dark:bg-slate-900"

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Screen />
    </GestureHandlerRootView>

  );
}

export default App;
