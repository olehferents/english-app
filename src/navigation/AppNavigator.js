import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StartScreen from '../screens/StartScreen'
import AuthNavigator from './AuthNavigator'
import DashboardNavigator from './DashboardNavigator'

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
      headerMode="none"
      screenOptions={{
        animationTypeForReplace: 'push',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
      />
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
      />
      <Stack.Screen
        name="BottomTab"
        component={DashboardNavigator}
      />
    </Stack.Navigator>
  )
}

export default AppNavigator
