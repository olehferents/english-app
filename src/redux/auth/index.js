import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import httpService from './../../api'

const initialState = {
  isLoading: false,
  token: null,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addCase(signUp.pending, state => {
      state.isLoading = true
    })
    builder.addCase(signUp.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    })
    builder.addCase(login.pending, state => {
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload
      state.isLoading = false
    })
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    })
  }
})

export const signUp = createAsyncThunk('auth/signUp', async ({
  email,
  password,
  confirmPassword
}, { rejectWithValue }) => {
  try {
    const { data } = await httpService.post('/auth/signUp', { email, password, confirmPassword })
    return data
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await httpService.post('/auth/login', { email, password })
    const { accessToken } = data
    await AsyncStorage.setItem('token', accessToken)
    return accessToken
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export default authSlice.reducer
