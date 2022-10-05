<template>
  <view class="dynamic-card">
    <view class="user-box">
      <view class="user-info">
        <view class="user-avatar">
          <u-avatar size="38" :src="userInfo.avatar"></u-avatar>
        </view>
        <view>
          <view class="user-name"> {{ userInfo.name }} </view>
          <view class="user-certification">
            <text class="cer-icon">
              <uni-icons color="#FCA001" type="clear" size="16"></uni-icons>
            </text>
            <text>未认证</text>
          </view>
        </view>
      </view>
      <view class="user-more">
        <uni-icons
          custom-prefix="iconfont"
          color="#54536E"
          type="icon-gengduo"
          size="22"
        ></uni-icons>
      </view>
    </view>
    <view class="dynamic-content">{{ content }}</view>
    <view class="dynamic-image-box">
      <u-grid :border="false" :col="colum">
        <u-grid-item
          v-for="(listItem, listIndex) in list"
          :key="listIndex"
          class="dynamic-image"
          :class="{ 'is-one': isOne, 'no-one': !isOne }"
        >
          <img :src="listItem" alt="" />
        </u-grid-item>
      </u-grid>
    </view>
    <view class="dynamic-info">
      <view class="dynamic-time">12小时前</view>
      <view class="dynamic-interact-box">
        <view class="dynamic-interact">
          <uni-icons
            custom-prefix="iconfont"
            color="#81868F"
            type="icon-fenxiang"
            size="19"
          ></uni-icons>
          <text class="interact-text">分享</text>
        </view>
        <view class="dynamic-interact">
          <uni-icons
            custom-prefix="iconfont"
            color="#81868F"
            type="icon-pinglun"
            size="19"
          ></uni-icons>
          <text class="interact-text">51</text>
        </view>
        <view class="dynamic-interact">
          <uni-icons
            custom-prefix="iconfont"
            color="#81868F"
            type="icon-dianzan"
            size="19"
          ></uni-icons>
          <text class="interact-text">192</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
export interface Props {
  imglist: string[]
  userInfo: UserInfo
  content: string
}
export interface UserInfo {
  name: string
  avatar: string
}
const props = withDefaults(defineProps<Props>(), {})
const { imglist: list, userInfo, content } = props
const colum = ref<number>()
const isOne = ref<boolean>()
onMounted(() => {
  if (list.length === 1) {
    colum.value = 1.75
    isOne.value = true
  } else if (list.length % 3 === 0) {
    colum.value = 3
    isOne.value = false
  }
})
</script>

<style scoped>
.user-box {
  display: flex;
  justify-content: space-between;
  padding: 20px 0 10px;
}

.user-info {
  display: flex;
}
.user-avatar {
  display: flex;
  align-items: center;
  padding-right: 8px;
}
.user-name {
  font-size: 16px;
  font-weight: 600;
}
.user-certification {
  display: flex;
  align-items: center;
  font-size: 12px;
}
.user-more {
  display: flex;
  align-items: center;
}
.cer-icon {
  line-height: 4px;
  height: 4px;
  padding-right: 2px;
}
.dynamic-card {
  padding: 0 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.514);
}
.dynamic-content {
  padding-bottom: 14px;
}
.dynamic-image {
  padding-right: 6px;
}
.is-one {
  height: 180px;
}
.no-one {
  height: 102px;
  padding-bottom: 5px;
}
.dynamic-image img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.dynamic-info {
  display: flex;
  justify-content: space-between;
  padding: 16px 0 10px;
  color: #81868f;
}
.dynamic-interact-box {
  display: flex;
}
.dynamic-interact {
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.interact-text {
  padding-left: 10px;
  line-height: 10px;
  height: 10px;
  font-size: 14px;
}
.dynamic-time {
  font-size: 12px;
}
</style>
