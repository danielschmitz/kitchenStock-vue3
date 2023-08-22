import { auth } from '@/auth'
import axios from 'axios'

const HttpService = axios.create({
  baseURL: import.meta.env.VITE_HTTP_SERVER,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

HttpService.interceptors.request.use(
    config => {
      const tokenHeader = auth.getHeader()
      if (tokenHeader !== '') config.headers.Authorization = tokenHeader
      return config
    },
    error => Promise.reject(error)
  )

export default HttpService
