import axios from '../utils/axios'

interface getFollowerListRes {
  success: string
  code: number
  data: Data
}

interface Data {
  userList: UserList[]
}

interface UserList {
  avator: string
  userName: string
  isFollowing: boolean
}

interface getFollowerListReq {
  userId: string
  type: string
}
//获取粉丝列表
export const getFollowerList = (params: getFollowerListReq) => {
  return axios.get<getFollowerListRes>(
    '/campus_api/follow/follower/list',
    params
  )
}
