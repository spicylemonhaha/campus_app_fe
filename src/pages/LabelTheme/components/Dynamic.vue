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
import { reactive, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
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
const { imglist, userInfo, content } = props
const kindList = ref(['热门', '最新'])
const active = ref('热门')
const changeTabColor = (tabName: string) => {
  active.value = tabName
}
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
