import axios from '../utils/axios'

interface getVisitorListRes {
  success: string
  code: number
  data: Data
}

interface Data {
  userList: UserList
}

interface UserList {
  listItem: Item
}

interface Item {
  avator: string
  userName: string
  isFollowing: boolean
}

interface getVisitorListReq {
  userId: string
  type: string
}

//获取最近访问列表
export const getVisitorList = (params: getVisitorListReq) => {
  return axios.get<getVisitorListRes>('/campus_api/follow/visitor/list', params)
}
