// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from './LandP';
import { createStackNavigator } from '@react-navigation/stack'
import ViewArea from './AppView';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LandP" component={Welcome} />
        <Stack.Screen name="AppView" component={ViewArea}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
