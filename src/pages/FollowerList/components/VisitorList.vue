<template>
  <view class="list">
    <text>最近访问（共{{ visitor.length }}人）</text>
    <uni-list>
      <follow-list-item
        v-for="item in visitor"
        :item="item"
        :key="item"
      ></follow-list-item>
    </uni-list>
  </view>
</template>

<script setup lang="ts">
import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue'
import FollowListItem from '../components/FollowListItem'
import { getVisitorList } from '../../../api'
import { reactive } from 'vue'
import { onShow } from '@dcloudio/uni-app'
let visitor = reactive([])
function getVisitor() {
  getVisitorList({
    userId: 'Jack',
    type: 'visitor',
  }).then((res) => {
    if (visitor.toString() !== res.data.userList.toString()) {
      visitor.push(...res.data.userList)
    }
  })
}
onShow(() => {
  getVisitor()
})
</script>

<style scoped>
.list {
  margin-top: 30px;
}
</style>
