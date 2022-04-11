import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const defaultOptions = {
  baseURL: 'https://f455-194-44-56-69.ngrok.io/api'
}

const instance = axios.create(defaultOptions)

instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
