import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Colors, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { login } from '../redux/auth'
import { theme } from '../styles/theme'

export default function LoginScreen ({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
  })
  const dispatch = useDispatch()
  const { isLoading, token } = useSelector(state => state.auth)

  const onLoginPressed = (data) => {
    dispatch(login(data))
  }

  useEffect(() => {
    if (token) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
    }
  }, [token])

  if (isLoading) {
    return (
      <Background>
        <ActivityIndicator animating={true} color={Colors.red800} />
      </Background>
    )
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack}/>
      <Logo/>
      <Header>Welcome back.</Header>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Email is required'
          },
          pattern:
            {
              value: /^(([^<>()\[\]\\.,*;:\s@"]+(\.[^<>()\[\]\\.,*;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Incorrect format of email'
            }
        }}
        render={(({ field: { onChange, value } }) => (
          <TextInput
            label="Email"
            returnKeyType="next"
            value={value}
            onChangeText={(value) => onChange(value)}
            error={!!errors?.email}
            errorText={errors?.email?.message}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
        ))}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Password is required'
          },
        }}
        render={(({ field: { onChange, value } }) => (
          <TextInput
            label="Password"
            returnKeyType="done"
            value={value}
            onChangeText={(value) => onChange(value)}
            error={!!errors?.password}
            errorText={errors?.password?.message}
            secureTextEntry
          />
        ))}
        name="password"
      />
      {/*<View style={styles.forgotPassword}>*/}
      {/*  <TouchableOpacity*/}
      {/*    onPress={() => navigation.navigate('ResetPasswordScreen')}*/}
      {/*  >*/}
      {/*    <Text style={styles.forgot}>Forgot your password?</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
      <Button mode="contained" onPress={handleSubmit(onLoginPressed)}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
