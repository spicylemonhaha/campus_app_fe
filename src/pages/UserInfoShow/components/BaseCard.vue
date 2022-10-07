<template>
  <view class="detailWrap">
    <view class="uni-margin-wrap">
      <swiper
        class="swiper"
        circular
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
      >
        <swiper-item>
          <view class="swiper-item uni-bg-red"
            ><image
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg"
              style="height: 450rpx; width: 100%; border-radius: 20rpx"
            ></image
          ></view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-green"
            ><image
              style="height: 450rpx; width: 100%; border-radius: 20rpx"
              src="https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            ></image
          ></view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-blue"
            ><image
              style="height: 450rpx; width: 100%; border-radius: 20rpx"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg"
            ></image
          ></view>
        </swiper-item>
      </swiper>
    </view>
    <view class="basicInfo">
      <view class="icon"></view>
      <view class="basic1"> 基本资料</view>
    </view>
    <view class="nameWrap">
      <view class="example-body profileHead">
        <image
          style="
            background-color: #ccc;
            width: 100rpx;
            height: 100rpx;
            border-radius: 50%;
          "
          src="https://cdn.uviewui.com/uview/album/2.jpg"
        ></image>
      </view>
      <view class="name"
        >{{ baseInfo.userName }}
        <text
          class="iconfont icon-xingbienan"
          style="color: #0eb1fe"
          v-if="baseInfo.sex == '男'"
        ></text>
        <text
          class="iconfont icon-xingbienv"
          style="color: #f84a72"
          v-else-if="baseInfo.sex == '女'"
        ></text>
      </view>
      <view class="position iconfont icon-weizhi"> {{ baseInfo.school }}</view>
    </view>
    <view class="ageWrap">
      <view class="age">{{ baseInfo.age }}岁</view>
      <view class="height">{{ baseInfo.height }}cm</view>
      <view class="star">{{ baseInfo.constellation }}</view>
    </view>
    <view class="lableWrap">
      <view class="lable"> 学好前端 </view>
      <view class="lable"> 学好前端 </view>
      <view class="lable"> 学好 </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
interface baseInfo {
  avatar?: string
  userName: string
  age: number
  height: string
  constellation: string
  school: string
  title: string[]
  sex: string
}
interface Props {
  baseInfo: baseInfo
}
const props = withDefaults(defineProps<Props>(), {})
const indicatorDots = ref(true)
const autoplay = ref(true)
const interval = ref(2000)
const duration = ref(800)
</script>
<style scoped>
.detailWrap {
  padding: 15rpx;
  margin: 25rpx;
  border-radius: 10px;
  background-color: white;
}
.swiper {
  height: 450rpx;
}
.detailWrap .basicInfo {
  height: 70rpx;
  width: 100%;
  position: relative;
}

.detailWrap .basicInfo .icon {
  position: absolute;
  border-radius: 20rpx;
  left: 20rpx;
  top: 18rpx;
  width: 15rpx;
  height: 30rpx;
  background-color: rgb(89, 208, 255);
}

.detailWrap .basicInfo .basic1 {
  position: absolute;
  top: 13.5rpx;
  left: 45rpx;
  font-size: 26rpx;
}

.detailWrap .nameWrap {
  height: 70rpx;
  width: 100%;
  display: flex;
  position: relative;
}

.profileHead {
  top: -12rpx;
  left: 0;
}

.detailWrap .nameWrap .name {
  font-weight: 600;
  padding-left: 15rpx;
  padding-top: 32rpx;
}

.detailWrap .nameWrap .position {
  position: absolute;
  font-size: 24rpx;
  right: 25rpx;
  top: 38rpx;
}

.detailWrap .ageWrap {
  height: 50rpx;
  width: 100%;
  display: flex;
  position: relative;
  border-bottom: 1px solid #ccc;
  margin-top: 50rpx;
  margin-left: 5rpx;
}

.detailWrap .ageWrap .age {
  position: absolute;
  font-size: 24rpx;
  left: 13rpx;
  color: black;
}

.detailWrap .ageWrap .height {
  position: absolute;
  font-size: 24rpx;
  left: 100rpx;
  color: black;
}

.detailWrap .ageWrap .star {
  position: absolute;
  font-size: 24rpx;
  left: 220rpx;
  color: black;
}
.lableWrap {
  display: flex;
  flex-wrap: wrap;
}
.lableWrap .lable {
  margin-top: 20rpx;
  margin-right: 20rpx;
  padding: 0 20rpx;
  height: 40rpx;
  line-height: 40rpx;
  font-size: 24rpx;
  text-align: center;
  border-radius: 10rpx;
  background-color: rgb(216, 244, 255);
  color: rgb(15, 172, 235);
  font-weight: 600;
}
</style>
