import axios, {type AxiosInstance} from 'axios'

export const publicApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})