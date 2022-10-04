import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

interface Result {
  code: number
  msg: string
}

interface ResultData<T = any> extends Result {
  data?: T
}
// 记得更改这个位置，如果有baseurl的话proxy不会进行替换，所以开发时可以填空字符串
const URL = process.env.NODE_ENV == 'development' ? '' : ''
enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 600,
  FAIL = 999,
  SUCCESS = 200,
}
const config = {
  baseURL: URL as string,
  timeout: RequestEnums.TIMEOUT as number,
  withCredentials: true,
}

class Request {
  service: AxiosInstance

  // 请求拦截器
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('token') || ''
        return {
          ...config,
          headers: {
            'x-access-token': token,
          },
        }
      },
      (error: AxiosError) => {
        Promise.reject(error)
      }
    )

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        if (data.code === RequestEnums.OVERDUE) {
          localStorage.setItem('token', '')
          return Promise.reject(data)
        }
        if (data.code && data.code !== RequestEnums.SUCCESS) {
          return Promise.reject(data)
        }
        return data
      },
      (error: AxiosError) => {
        const { response } = error
        if (response) {
          // todo: 这里记住要重新封装一下
          return Promise.reject(response)
        }
      }
    )
  }

  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.get(url, { params })
  }

  post<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.post(url, params)
  }

  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.put(url, params)
  }

  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.delete(url, { params })
  }
}

export default new Request(config)
