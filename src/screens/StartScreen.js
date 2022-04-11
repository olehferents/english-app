import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Background from '../components/Background'
import Button from '../components/Button'
import Header from '../components/Header'
import Logo from '../components/Logo'
import Paragraph from '../components/Paragraph'

export default function StartScreen({ navigation }) {
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        navigation.navigate('BottomTab', { screen: 'Dashboard' })
      }
    }

    getToken()
  }, [])

  return (
    <Background>
      <Logo />
      <Header>Login Template</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Auth', { screen: 'LoginScreen' })}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Auth', { screen: 'SignUpScreen' })}
      >
        Sign Up
      </Button>
    </Background>
  )
}
