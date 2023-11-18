// App.tsx
import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import store from './src/store'
import UserDisplay from './src/components/UserDisplay'

const Stack = createStackNavigator()

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="UserDisplay" component={UserDisplay} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
