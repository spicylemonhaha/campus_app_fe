<template>
  <view class="item">
    <uni-list-chat
      :avatarCircle="true"
      :avatar="item.avatar"
      :title="item.title"
      :note="item.note"
      :badgeText="item.badgeText"
      :clickable="true"
      :time="item.time"
      v-show="isShow.value"
      @click="clickItem"
      @longpress="onLongPress"
    ></uni-list-chat>
  </view>
</template>

<script setup lang="ts">
import uniListChat from '@dcloudio/uni-ui/lib/uni-list-chat/uni-list-chat.vue'
import { reactive } from 'vue'
export interface Props {
  item: Item
}
export interface Item {
  title: string
  avatar: string
  note: string
  time: string
  badgeText?: number
}
const props = withDefaults(defineProps<Props>(), {})
const { item } = props
function clickItem() {
  //封装点击前往对应的聊天界面
}
let isShow = reactive({ value: true })
function onLongPress() {
  uni.showModal({
    title: '删除提示',
    content: '是否要删除该聊天？',
    success: function (res) {
      if (res.confirm) {
        isShow.value = false
      }
    },
  })
}
</script>

<style scoped>
.item {
  margin-bottom: 5px;
}
</style>
