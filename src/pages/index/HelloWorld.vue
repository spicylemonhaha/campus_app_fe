<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }} </text>
    </view>
    <button @click="haha">你好</button>
  </view>
</template>

<script setup lang="ts">
import { C3 } from '../../api'

import { ref } from 'vue'
const title = ref('放在糖果旁的是我很想回忆的甜~')
const haha = () => {
  console.log(C3())
  console.log(process.env.NODE_ENV)
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
