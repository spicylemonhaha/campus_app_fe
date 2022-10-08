<template>
  <view class="follow-box">
    <view class="kind-box">
      <view class="kind-content" v-for="item in kindList" :key="item">
        <text
          class="kind-text"
          :class="{ active: active == item }"
          @click="changeTabColor(item)"
          >{{ item }}
        </text>
      </view>
    </view>
    <following></following>
    <follower></follower>
    <visitor></visitor>
  </view>
</template>

<script setup lang="ts">
import Visitor from './components/VisitorList'
import Following from './components/FollowingList'
import Follower from './components/FollowerList'
import { ref } from 'vue'
const kindList = ref(['关注', '粉丝', '最近访问'])
const active = ref('关注')

const changeTabColor = (tabName: string) => {
  active.value = tabName
  switch (tabName) {
    case '关注':
      break
    case '粉丝':
      break
    case '最近访问':
  }
}
</script>

<style scoped>
.kind-box {
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: space-around;
}
.kind-content {
  font-size: 18px;
}
.active {
  font-weight: 600;
  border-bottom: 3px solid rgb(89, 208, 255);
}
</style>
