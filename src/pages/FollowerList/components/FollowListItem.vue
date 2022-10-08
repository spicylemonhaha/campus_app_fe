<template>
  <view>
    <uni-list-item class="list-item">
      <template v-slot:header>
        <view class="slot-box">
          <img :src="item.avator" class="slot-image" />
        </view>
      </template>
      <template v-slot:body>
        <text class="slot-box slot-text">{{ item.userName }}</text>
      </template>
      <template v-slot:footer>
        <button class="follow" @click="follow">
          {{ isFollow ? '已关注' : '关注' }}
        </button>
      </template>
    </uni-list-item>
  </view>
</template>

<script setup lang="ts">
import uniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue'
import { computed } from 'vue'
export interface Props {
  item: Item
}
export interface Item {
  avatar: string
  userName: string
  isFollowing: boolean
}

const props = withDefaults(defineProps<Props>(), {})
const { item } = props
console.log(item.avator)
let isFollow = computed(() => {
  return item.isFollowing
})
function follow() {
  item.isFollowing = !item.isFollowing
}
</script>

<style scoped>
.list-item {
  /* background-color: rgb(89, 208, 255); */
}
.slot-box {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.slot-image {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.slot-text {
  flex: 1;
  font-size: 18px;
}
.follow {
  border-radius: 7px;
  background-color: #f3f4f8;
  width: 100px;
  height: 35px;
  line-height: 35px;
}
</style>
