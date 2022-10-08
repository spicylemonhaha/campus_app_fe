import axios from '../utils/axios'

interface getFollowingListRes {
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

interface getFollowingListReq {
  userId: string
  type: string
}

//获取关注列表
export const getFollowingList = (params: getFollowingListReq) => {
  return axios.get<getFollowingListRes>(
    '/campus_api/follow/following/list',
    params
  )
}
