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
import { reactive } from 'vue'
import { getFollowingList } from '../../../api'
import { onShow } from '@dcloudio/uni-app'
let following = reactive([])
function getFollowing() {
  getFollowingList({
    userId: 'Jack',
    type: 'following',
  }).then((res) => {
    if (following.toString() !== res.data.userList.toString()) {
      following.push(...res.data.userList)
    }
  })
}
onShow(() => {
  getFollowing()
})
</script>

<style scoped>
.list {
  margin-top: 30px;
}
</style>
