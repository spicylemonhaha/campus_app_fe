<template>
  <view class="chat">
    <text class="info">消息</text>
    <view class="iconfont icon-gerenxinxi" @click="toInfo"></view>
    <chats-list class="list"></chats-list>
  </view>
</template>

<script setup lang="ts">
import ChatsList from '../ChatList/components/ChatsList.vue'
function toInfo() {
  //前往用户个人的信息页
}
</script>

<style scoped>
.chat {
  background-color: rgb(89, 208, 255);
}
.info {
  font-size: 20px;
  position: relative;
  left: 10px;
  top: 20px;
}

.iconfont {
  float: right;
  font-size: 25px;
  position: relative;
  right: 10px;
  top: 20px;
}
</style>
