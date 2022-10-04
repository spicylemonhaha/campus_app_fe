import axios from '../utils/axios'

// 用户登录表单
interface ResData {
  C3: string
}

// 用户登录
export const C3 = () => {
  // 返回的数据格式可以和服务端约定
  return axios.post<ResData>('/api/group/C3')
}
