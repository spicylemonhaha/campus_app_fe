import axios from '../utils/axios'

// 登陆信息
interface loginInfo {
	username:'string'
	password:'string'
}

// 返回的用户信息
interface userInfo {
	id:number,
	username:'string',
	avatar:'string',
	phone:'string',
	sign:'string',
	createTime:Date,
	updateTime:Date
	
}
//用户登陆
export const login = (data : loginInfo) => {
	return axios.post<userInfo>('/api/user/login',data)
}