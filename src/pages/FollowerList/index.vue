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
    <follower-list :following="show"></follower-list>
  </view>
</template>

<script setup lang="ts">
import FollowerList from './components/FollowerList'
import { computed, reactive, ref } from 'vue'
import { getFollowingList, getFollowerList, getVisitorList } from '../../api'
import { onShow } from '@dcloudio/uni-app'

let follow = {
  following: reactive([]),
  follower: reactive([]),
  visitor: reactive([]),
}

const getFollowing = () => {
  getFollowingList({
    userId: 'Jack',
    type: 'following',
  }).then((res) => {
    console.log(res)
    if (follow.following.toString() !== res.data.userList.toString()) {
      follow.following.push(...res.data.userList)
    }
  })
}

onShow(() => {
  getFollowing()
})

const getFollower = () => {
  getFollowerList({
    userId: 'Jack',
    type: 'follower',
  }).then((res) => {
    if (follow.follower.toString() !== res.data.userList.toString()) {
      follow.follower.push(...res.data.userList)
    }
  })
}
const getVisitor = () => {
  getVisitorList({
    userId: 'Jack',
    type: 'visitor',
  }).then((res) => {
    if (follow.visitor.toString() !== res.data.userList.toString()) {
      follow.visitor.push(...res.data.userList)
    }
  })
}

const kindList = ref(['关注', '粉丝', '最近访问'])
const active = ref('关注')
let currentType = ref('following')
const changeTabColor = (tabName: string) => {
  active.value = tabName
  switch (tabName) {
    case '关注':
      getFollowing()
      currentType.value = 'following'
      console.log(show)
      break
    case '粉丝':
      console.log('切换到粉丝列表')
      getFollower()
      console.log(show)
      currentType.value = 'follower'
      break
    case '最近访问':
      console.log('切换到访客列表')
      getVisitor()
      console.log(show)
      currentType.value = 'visitor'
  }
}
let show = computed(() => {
  return follow[currentType.value]
})
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
