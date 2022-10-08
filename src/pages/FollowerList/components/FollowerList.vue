<template>
  <view class="list">
    <text>我的关注（共{{ following.length }}人）</text>
    <uni-list>
      <follow-list-item
        v-for="item in following"
        :item="item"
        :key="item"
      ></follow-list-item>
    </uni-list>
  </view>
</template>

<script setup lang="ts">
import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue'
import FollowListItem from '../components/FollowListItem'

export interface Props {
  following: Following[]
  type: string
}
export interface Following {
  avator: string
  userName: string
  isFollowing: boolean
}
let props = withDefaults(defineProps<Props>(), {})
let { following, type } = props
</script>

<style scoped>
.list {
  margin-top: 30px;
}
</style>
