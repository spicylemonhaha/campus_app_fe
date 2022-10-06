<template>
  <!-- 基本信息 -->
  <BaseCard :baseInfo="baseInfo"></BaseCard>
  <!-- 卡片区 -->
  <Card :cardDataArr="cardDataArr"></Card>
  <!-- 动态展示 -->
  <view class="introduceWrap">
    <view class="introduceHead">
      <view class="icon"></view>
      <view class="aboutMe">Ta的动态</view>
      <view class="allDynamics">查看全部动态 ></view>
    </view>
    <DynamicCard :imglist="imglist" :userInfo="userInfo" :content="content" />
  </view>
  <view class="empty"></view>
  <view class="btn-wrap">
    <view class="btn-like"><text class="iconfont icon-aixintongdao" style="color: red; font-size: 18px; margin-right: 10rpx;"></text>关注</view>
    <view class="btn-chat"><text class="iconfont icon-icon" style="color: #0f9efe; font-size: 18px; margin-right: 10rpx;"></text> 发起聊天</view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Card from './components/Card.vue'
import DynamicCard from '../../components/DynamicCard.vue'
import BaseCard from './components/BaseCard.vue'
const cardDataArr = reactive([
  {
    title: '关于我',
    content: '喜欢打王者',
    cards: ['努力学习', '学好前端', '加油'],
  },
  {
    title: '兴趣爱好',
    content: '喜欢打王者',
    cards: ['努力学习', '学好前端', '加油'],
  },
  {
    title: '感情观',
    content: '喜欢打王者',
    cards: ['努力学习', '学好前端', '加油'],
  },
  {
    title: '心仪的Ta',
    content: '喜欢打王者',
    cards: ['努力学习', '学好前端', '加油'],
  },
])
const imglist = [
  'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
]
const userInfo = {
  name: '某个同学',
  avatar: 'https://cdn.uviewui.com/uview/album/2.jpg',
}
const content = '一个人的黄昏'
const baseInfo = {
  avatar: 'https://cdn.uviewui.com/uview/album/2.jpg',
  userName: '咖啡多加糖',
  age: 20,
  height: '177',
  constellation: '双子座',
  location: '河南 郑州',
  title: ['努力学习', '学好前端', '加油'],
  sex:'男'
}
</script>

<style scoped>
page {
  background-color: #f3f4f8;
}
.introduceWrap {
  padding: 15rpx;
  margin: 25rpx;
  border-radius: 10px;
  background-color: white;
}

.introduceWrap .introduceHead {
  height: 70rpx;
  width: 100%;
  position: relative;
}

.introduceWrap .introduceHead .icon {
  position: absolute;
  border-radius: 20rpx;
  left: 20rpx;
  top: 18rpx;
  width: 15rpx;
  height: 30rpx;
  background-color: rgb(89, 208, 255);
}

.introduceWrap .introduceHead .aboutMe {
  position: absolute;
  top: 15.5rpx;
  left: 45rpx;
  font-size: 26rpx;
}
.allDynamics {
  position: absolute;
  top: 15.5rpx;
  right: 35rpx;
  font-size: 26rpx;
  color: rgb(172, 169, 169);
}
.empty {
  height: 150rpx;
}
.btn-wrap {
  position: fixed;
  bottom: 50rpx;
  width: 500rpx;
  height: 100rpx;
  display: flex;
  justify-content: space-between;
  left: 50%;
  margin-left: -250rpx;
}
.btn-like {
  display: flex;
  background-image: url(../../static/warmpink.png);
  width: 200rpx;
  height: 90rpx;
  justify-content: center;
  align-items: center;
  border-radius: 35rpx;
  font-weight: 600;
  color: rgb(255, 105, 105);
}
.btn-chat {
  display: flex;
  background-image: url(../../static/skyblue.png);
  width: 200rpx;
  height: 90rpx;
  justify-content: center;
  align-items: center;
  border-radius: 35rpx;
  font-weight: 600;
  color: rgb(7, 180, 233);
}
.example-body {
  padding: 10px;
  padding-top: 0;
}

.uni-margin-wrap {
  width: 690rpx;
  width: 100%;
}

.swiper {
  height: 450rpx;
}

.swiper-item {
  border-radius: 20rpx;
  display: block;
  margin: 25rpx;
}
.detailWrap {
  padding: 15rpx;
  margin: 25rpx;
  border-radius: 10px;
  background-color: white;
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
  position: relative;
  font-size: 24rpx;
  left: 270rpx;
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
  background-color: #e1ffe1;
  color: #17b12b;
  font-weight: 600;
}
</style>
