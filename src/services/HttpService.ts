import { auth } from '@/auth'
import router from '@/router'
import axios, { AxiosError } from 'axios'

const HttpService = axios.create({
  baseURL: import.meta.env.VITE_HTTP_SERVER,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// intercept Request and send token
HttpService.interceptors.request.use(
  (config) => {
    const tokenHeader = auth.getHeader()
    if (tokenHeader !== '') config.headers.Authorization = tokenHeader
    return config
  },
  (error) => Promise.reject(error)
)

// intercept Request to handle errors
HttpService.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error)

    // if (axios.isAxiosError(error)) {
    //   const axiosError = error as AxiosError
    //   const httpStatus = axiosError.response?.status
    //   if (httpStatus == 401) {
    //     router.push({ path: '/login' })
    //     return Promise.reject(error)
    //   }
    // }

    return Promise.reject(error)
  }
)

export default HttpService
