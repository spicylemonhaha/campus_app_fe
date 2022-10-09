import axios from '../utils/axios'

interface addCommentLikeRes {
  success: boolean
  code: number
}
interface addCommentLikeReq {
  dynamicId: string
  commentId: string
  userId: string
}

// 点赞评论
export const addCommentLike = (params: addCommentLikeReq) => {
  // 返回的数据格式可以和服务端约定
  return axios.post<addCommentLikeRes>('/campus_api/comment/like/add', params)
}
