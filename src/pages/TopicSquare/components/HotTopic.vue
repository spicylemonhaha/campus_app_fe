<template>
  <view class="talkContent">
    <view class="contentWrap">
      <navigator
        v-for="(item, index) in topic"
        :key="index"
        class="content"
        url="../topicDetail/topicDetail?topic=#立个脱单flag"
        >{{ item }}</navigator
      >
    </view>
  </view>
</template>
<script setup lang="ts">
export interface Props {
  topic: string[]
}
const props = withDefaults(defineProps<Props>(), {})
</script>
<style scoped>
.talkContent .contentWrap {
  display: flex;
  flex-wrap: wrap;
}
.talkContent .contentWrap .content {
  display: block;
  font-weight: 600;
  font-size: 28rpx;
  border-radius: 25rpx;
  line-height: 55rpx;
  text-align: center;
  margin-left: 30rpx;
  margin-bottom: 25rpx;
  width: 330rpx;
  height: 55rpx;
  background-color: white;
}
</style>
