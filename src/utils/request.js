import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from 'utils/auth'
import router from '../router'

const request = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
})

request.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    // do something
    if (response.data.status === 1001) {
      Message({
        message: response.data.msg || 'error',
        type: 'error',
        duration: 2000,
        onClose () {
          router.push({
            path: '/login',
            query: { redirect: location.hostname }
          })
        }
      })
    } else if (response.data.status !== 200) {
      Message({
        message: response.data.msg || 'error',
        type: 'error',
        duration: 2000,
        onClose () {
          router.push({
            path: '/login',
            query: { redirect: location.hostname }
          })
        }
      })
    }
    return response
  },
  error => {
    console.log(`err: ${error.Message}`)
    Message({
      message: error.Message,
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default request
