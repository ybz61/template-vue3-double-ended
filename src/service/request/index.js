import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config.js'

class apiRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    // 请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        console.log('[ request err ] >', err)
        return err
      }
    )

    // 响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        console.log('[ response err ] >', err)
        return err
      }
    )
  }

  request(config) {
    // mainStore.isLoading = true
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'get' })
  }

  post(config) {
    return this.request({ ...config, method: 'post' })
  }
}

export default new apiRequest(BASE_URL, TIMEOUT)
