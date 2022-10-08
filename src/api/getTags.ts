import axios from '../utils/axios'
/**
 * ApifoxModel
 */
interface getTagsRes {
  code: number
  data: Data
  success: boolean
}

interface Data {
  topicList: TopicList
}

interface TopicList {
  historyTopic: string[]
  recentTopic: string[]
}

// 获取话题标签
export const getTagsReq = () => {
  return axios.get<getTagsRes>('/campus_api/tag/list')
}
