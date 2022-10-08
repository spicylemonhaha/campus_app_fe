import axios from '../utils/axios'

interface getDynamicListReq {
  tag: string
  dynamicType: string
}

interface getDynamicListRes {
  success: string
  code: number
  ammountPeople: number
  data: Data
}

interface Data {
  dynamicList: List[]
}

interface List {
  dynamicId: string
  contentText: string
  contentPicture: string[]
  likeAmount: number
  isLike: boolean
  commentAmount: number
  publishTime: number
  personalSign: string
  tag: string
  school: string
  sex: string
  userName: string
}

export const getDynamicList = (params: getDynamicListReq) => {
  return axios.get<getDynamicListRes>('/campus_api//dynamic/tag/list', params)
}
