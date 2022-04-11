import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StartScreen from '../screens/StartScreen'
import AuthNavigator from './AuthNavigator'
import BottomTabNavigator from './BottomTabNavigator'

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
      {/*<Stack.Screen*/}
      {/*  name="Dashboard"*/}
      {/*  component={BottomTabNavigator}*/}
      {/*/>*/}
    </Stack.Navigator>
  )
}

export default AppNavigator
