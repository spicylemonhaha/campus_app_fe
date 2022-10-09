<template>
  <view class="box">
    <view class="user-box">
      <view class="user-info" @click="checkToUserShow">
        <view class="user-avatar">
          <u-avatar size="50" :src="avatarUrl"></u-avatar>
        </view>
        <view>
          <view class="user-name"> 某个同学 </view>
          <view class="user-certification">
            <text class="cer-icon"
              ><uni-icons color="#FCA001" type="clear" size="16"></uni-icons
            ></text>
            <text>未认证</text>
          </view>
        </view>
      </view>
      <view class="user-edit"
        ><u-button
          type="primary"
          shape="circle"
          :plain="true"
          :hairline="true"
          text="编辑"
          color="#575555"
          size="small"
          @click="handlerEdic"
        ></u-button
      ></view>
    </view>
    <view class="prefer-box">
      <PreferBar :data="iLike.data" :title="iLike.title"></PreferBar>
      <PreferBar :data="likeMe.data" :title="likeMe.title"></PreferBar>
      <PreferBar :data="visitCount.data" :title="visitCount.title"></PreferBar>
    </view>
    <Bar :barArr="barArr"></Bar>
    <view class="foot">校园号： 1062233</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
import Bar from './components/Bar.vue'
import PreferBar from './components/PreferBar.vue'
const avatarUrl = ref<string>('https://cdn.uviewui.com/uview/album/2.jpg')
const barArr = [
  { icon: 'auth', title: '学校认证' },
  { icon: 'hand-up', title: '推荐给好友' },
  { icon: 'icon-fankuijianyi', title: '用户反馈', isCustom: 'iconfont' },
]
const iLike = ref({
  data: 0,
  title: '我喜欢的',
})
const likeMe = ref({
  data: 5,
  title: '喜欢我的',
})
const visitCount = ref({
  data: 44,
  title: '最近来访',
})
// 点击编辑按钮-页面跳转
const handlerEdic = () => {
  uni.navigateTo({
    url: '../UserInfoEdit/index',
  })
}
const checkToUserShow = () => {
  uni.navigateTo({
    url: '../UserInfoShow/index',
  })
}
</script>

<style scoped>
.u-button--plain {
  background-color: rgba(255, 255, 255, 0);
}

.box {
  padding: 0 20px;
  background-color: #f3f4f8;
  height: 100vh;
}
.user-box {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}
.user-info {
  display: flex;
}
.user-avatar {
  padding-right: 10px;
}
.user-name {
  font-size: 18px;
  font-weight: 600;
}
.user-certification {
  display: flex;
  align-items: center;
  padding-top: 5px;
  font-size: 12px;
}
.user-edit {
  display: flex;
  align-items: center;
}
.cer-icon {
  padding-right: 4px;
}
.prefer-box {
  display: flex;
  justify-content: space-around;
  padding: 2px 0 10px;
}
.foot {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  font-size: 12px;
  color: rgb(150, 152, 156);
}
</style>
