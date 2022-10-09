import axios from '../utils/axios'

interface publishTrendsRes {
  success: boolean
  code: number
}
interface publishTrendsReq {
  userId: string
  contentText: string
  contentPicture: string
  tag: string
}

export const publishTrends = (params: publishTrendsReq) => {
  return axios.post<publishTrendsRes>('/campus_api/dynamic/publish')
}
