<template>
  <view class="user_info_wrap">话题大集合</view>
  <view class="titleNow">近期话题</view>
  <HotTopicVue :topic="topicNow"></HotTopicVue>

  <view class="titleOld">历史话题</view>
  <HotTopicVue :topic="topicOld"></HotTopicVue>
</template>
<script setup lang="ts">
import HotTopicVue from './components/HotTopic.vue'
import { reactive } from 'vue'
const topicNow = reactive([
  '#立个脱单flag',
  '#第一条动态',
  '#寻找那个Ta',
  '#失物招领处',
  '#男生请回答',
  '#女生请回答',
  '#我们官宣啦',
  '#求助，在线等',
  '#心情树洞',
  '#二手交易',
])
const topicOld = reactive([
  '#寻找那个Ta',
  '#假如回到17岁',
  '#单身原因自查',
  '#想恋爱的瞬间',
])
</script>
<style scoped>
page {
  background-color: #eeeeee;
}
.user_info_wrap {
  height: 25vh;
  text-align: center;
  line-height: 25vh;
  font-style: oblique;
  font-weight: 600;
  font-size: 54rpx;
  background-image: url(https://z3.ax1x.com/2021/11/14/IcVZ80.png);
}
.titleNow {
  padding: 18rpx;
  font-size: 28rpx;
  color: #a1a1a1;
}
.titleOld {
  padding: 18rpx;
  margin-top: -20rpx;
  font-size: 28rpx;
  color: #a1a1a1;
}
</style>
