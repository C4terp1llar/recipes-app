import axios, {type AxiosInstance} from 'axios'
import router from "@/app/providers/router.ts";

export const authApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// подставляем токен
authApi.interceptors.request.use((config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}))

// обработка некорректного токена
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      router.push('/auth')
    }
    return Promise.reject(error)
  }
)