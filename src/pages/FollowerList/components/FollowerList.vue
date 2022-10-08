<template>
  <view class="list">
    <text>我的粉丝（共{{ follower.length }}人）</text>
    <uni-list>
      <follow-list-item
        v-for="item in follower"
        :item="item"
        :key="item"
      ></follow-list-item>
    </uni-list>
  </view>
</template>

<script setup lang="ts">
import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue'
import FollowListItem from '../components/FollowListItem'
import { getFollowerList } from '../../../api'
import { reactive } from 'vue'
import { onShow } from '@dcloudio/uni-app'

let follower = reactive([])
const getFollower = () => {
  getFollowerList({
    userId: 'Jack',
    type: 'following',
  }).then((res) => {
    if (follower.toString() !== res.data.userList.toString()) {
      follower.push(...res.data.userList)
    }
  })
}
onShow(() => {
  getFollower()
})
</script>

<style scoped>
.list {
  margin-top: 30px;
}
</style>
