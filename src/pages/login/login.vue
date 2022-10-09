<template>
	<view>
		<!-- <uni-status-bar></uni-status-bar> -->
		<view
			class="head-wrapper flex align-center font-lg"
			:style="'top:'+statusBarHeight+'px;'"
		>
			<uni-icons
			  custom-prefix="iconfont"
			  color="#54536E"
			  type="icon-guanbi"
			  @click="back"
			></uni-icons>
		</view>
		<view class="text-center" style="padding-top: 130rpx;padding-bottom: 70rpx;font-size:55rpx;">
			{{status ? '手机验证码登陆':'账号密码登陆'}}
		</view>
		<view class="px-2">
			<template v-if="!status">
				<view class="mb-2">
					<input type="text" v-model="username" placeholder="用户名/手机号" class="border-bottom p-2" />
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" v-model="password" placeholder="请输入密码" class="border-bototm p-2 flex-1">
					<view class="border-botom flex align-center jusify-center font text-muted" style="width:150rpx;">
						忘记密码？
					</view>
				</view>
			</template>
			
			<template v-else>
				<view class="mb-2 flex align-stretch">
					<view class="border-bottom flex align-center justify-content font px-2">
						+86
					</view>
					<input type="text" v-model="phone" placeholder="手机号" class="border-bottom p-2 flex-1" />
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" v-model="code" placeholder="请输入密码" class="border-bototm p-2 flex-1">
					<view 
						class="border-botom flex align-center justify-center font-sm text-white" 
						style="width:180rpx;"
						@click="getCode"
						:class="codeTime > 0 ? 'bg-main-disabled' : 'bg-main' "
					>
						{{codeTime > 0 ? codeTime+' s' : '获取验证码'}}
					</view>
				</view>
			</template>
		</view>
		
		<view class="py-2 px-3">
			<button 
			class="bg-main text-white" 
			style="border-radius:50rpx;border:0;"
			type="primary"
			:disabled="disabled"
			:class=" disabled ? 'bg-main-disabled' : 'bg-main' "
			@click="submit"
			>
				登陆
			</button>
		</view>
		<view class="flex align-center justify-center pt-2 pb-4">
			<view 
				class="text-primary font-sm"
				@click="changeStatus"
			>
				{{status?'账号密码登陆':'手机验证码登陆'}}
			</view>
			<text class="text-muted mx-2">|</text>
			<view class="primary font-sm">
				登陆遇到问题
			</view>
		</view>
		
		<view class="flex align-center justify-center">
			<view style="height:1rpx;background-color:#dddddd;width:100rpx;"></view>
			<view class="mx-2 text-muted">
				社交账号登陆
			</view>
			<view style="height:1rpx;background-color:#dddddd;width:100rpx;"></view>
		</view>
		<view class="flex align-center px-5 py-3">
			<view class="flex-1 flex align-center justify-between">
				<uni-icons
				  custom-prefix="iconfont"
				  color="#fff"
				  type="icon-QQ"
				  class="text-white bg-primary flex align-center justify-center rounded-circle"
				  style="width:100rpx;height:100rpx;font-size:25px;"
				></uni-icons>
				<uni-icons
				  custom-prefix="iconfont"
				  color="#fff"
				  type="icon-weixin"
				  class="text-white uni-bg-green flex align-center justify-center rounded-circle weixin"
				  style="width:100rpx;height:100rpx;font-size:25px;"
				></uni-icons>
				<uni-icons
				  custom-prefix="iconfont"
				  color="#fff"
				  type="icon-weibo"
				  class="font-lg text-white uni-badge-yellow flex align-center justify-center rounded-circle weibo"
				  style="width:100rpx;height:100rpx;font-size:25px;"
				></uni-icons>
			</view>
		</view>
		<view class="flex align-center justify-center text-muted">
			注册即代表同意<text class="text-primary">《xxx社区协议》</text>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from '../../components/uni-ui/uni-status-bar.vue';
	import {login} from '../../api';
	
	export default {
		components: {
			uniStatusBar,
		},
		data() {
			return {
				status:false,
				username:"",
				password:"",
				phone:"",
				code:"",
				codeTime:0
			}
		},
		onLoad() {
			
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			initForm() {
				this.username='',
				this.password='',
				this.phone='',
				this.code=''
			},
			//切换登陆方式
			changeStatus(){
				//初始化表单
				this.initForm()
				this.status=!this.status
			},
			getCode() {
				//获取验证码
				if(this.codeTime>0) {
					return
				}
				if(!this.validate()) return
				this.codeTime=60
				let timer=setInterval(()=>{
					if(this.codeTime>=1) {
						this.codeTime--
					}else {
						this.codeTime=0
						clearInterval(timer)
					}
				},1000)
			},
			//表单验证
			validate() {
				//手机号正则
				var mPattern=/^1[34578]\d{9}$/
				if(!mPattern.test(this.phone)) {
					uni.showToast({
						title:'手机号格式不正确',
						icon:'none'
					})
					return false
				}
				return true
			},
			async submit() {
				if(this.status && !this.validate()) return
				const userInfo=await login({
					username:this.username,
					password:this.password
				})
				if(userInfo.success) {
					const token=userInfo.data.token
					uni.showToast({
						title:'登陆成功',
						icon:'success'
					})
					//TODO
					//存储token到pinia
				}else {
					uni.showToast({
						title:'用户名或密码错误',
						image:'/static/icons/error.png'
					})
				}
			}
		},
		computed: {
			disabled() {
				if((this.username==='' || this.password==='') && (this.phone===''||this.code===''))   {
					return true
				}
				return false
			}
		}
	}
</script>

<style>
.head-wrapper {
	padding-left:20rpx;
	padding-top: 20rpx;;
}
</style>
