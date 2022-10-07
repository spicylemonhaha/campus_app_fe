<template>
  <view class="theme">
    <view class="kind-box">
      <view class="kind-content" v-for="item in kindList" :key="item">
        <text
          class="kind-text"
          :class="{ active: active == item }"
          @click="changeTabColor(item)"
          >{{ item }}</text
        >
      </view>
    </view>
    <dynamic-card
      :imglist="imglist"
      :userInfo="userInfo"
      :content="content"
    ></dynamic-card>
  </view>
</template>

<script setup lang="ts">
import DynamicCard from '../../../components/DynamicCard.vue'
import { ref } from 'vue'
const kindList = ref(['热门', '最新'])
const active = ref('热门')
const changeTabColor = (tabName: string) => {
  active.value = tabName
}
const imglist = [
  'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
]
const userInfo = {
  name: '不负韶华',
  avatar: 'https://cdn.uviewui.com/uview/album/2.jpg',
}
const content =
  '我可真是无语啊！我可真是无语啊！我可真是无语啊！我可真是无语啊！我可真是无语啊！我可真是无语啊！我可真是无语啊！'
</script>

<style scoped>
.theme {
  height: 100vh;
  padding: 0 8px;
  background-color: #f3f4f8;
}
.kind-box {
  display: flex;
}
.kind-content {
  padding: 4px 7px;
}
.active {
  font-weight: 600;
  border-bottom: 3px solid rgb(89, 208, 255);
}
</style>
