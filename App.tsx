// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from './LandP';
import { createStackNavigator } from '@react-navigation/stack'
import ViewArea from './AppView';
import AutomationApp from './hamadb';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LandP" component={Welcome} />
        <Stack.Screen name="AppView" component={ViewArea}/>
        <Stack.Screen name="hamadb" component={AutomationApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
