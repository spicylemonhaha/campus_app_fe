<template>
  <view class="talkWrap">
    <view class="talkHead">
      <text class="iconfont icon-huati headLeft"></text>
      <text class="headRight"> 热门话题</text>
    </view>
    <view class="talkContent">
      <view class="contentWrap">
        <navigator
          url="../topicDetail/topicDetail?topic=#我们官宣啦"
          class="content"
          >#我们官宣啦</navigator
        >
        <navigator
          url="../topicDetail/topicDetail?topic=#第一条动态"
          class="content"
          >#第一条动态</navigator
        >
      </view>
      <view class="contentWrap">
        <navigator
          class="content"
          url="../topicDetail/topicDetail?topic=#失物招领处"
          >#失物招领处</navigator
        >
        <navigator
          class="content"
          url="../topicDetail/topicDetail?topic=#求助，在线等"
          >#求助，在线等</navigator
        >
      </view>
      <view class="contentWrap">
        <navigator
          class="content"
          url="../topicDetail/topicDetail?topic=#校园无语瞬间"
          >#校园无语瞬间</navigator
        >
        <navigator
          url="../talkAbout/talkAbout"
          class="contentT iconfont icon-youjiantou"
          >更多话题</navigator
        >
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

</script>

<style scoped>
.talkWrap {
  background-color: white;
  margin: 16rpx;
  border-radius: 8px;
}
.talkWrap .talkHead {
  padding-left: 20rpx;
  position: relative;
  padding-top: 8rpx;
  padding-bottom: 8rpx;
}
.talkWrap .talkHead .headLeft {
  font-size: 42rpx;
  color: #1fe0c7;
}
.talkWrap .talkHead .headRight {
  font-weight: 600;
  font-size: 28rpx;
  position: relative;
  top: -4rpx;
}
.talkWrap .talkContent .contentWrap {
  display: flex;
}
.talkWrap .talkContent .contentWrap .content {
  display: block;
  font-weight: 600;
  font-size: 28rpx;
  border-radius: 10rpx;
  line-height: 55rpx;
  text-align: center;
  margin-left: 20rpx;
  margin-bottom: 20rpx;
  width: 330rpx;
  height: 55rpx;
  background-color: #f3f3f3;
}
.talkWrap .talkContent .contentWrap .contentT {
  display: block;
  font-weight: 600;
  font-size: 28rpx;
  border-radius: 10rpx;
  line-height: 55rpx;
  text-align: center;
  margin-left: 20rpx;
  margin-bottom: 20rpx;
  width: 330rpx;
  height: 55rpx;
  background-color: white;
  color: #1adbc2;
  border: 1px #d8d5d5 solid;
}
</style>
