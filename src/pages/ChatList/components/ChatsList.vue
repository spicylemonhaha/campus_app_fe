<template>
  <view>
    <uni-search-bar
      placeholder="搜索"
      :radius="100"
      v-model="keyWord.value"
      class="search"
    ></uni-search-bar>
    <uni-list class="list">
      <chats-list-item
        v-for="item in filterList"
        :item="item"
        :key="item.iid"
      ></chats-list-item>
    </uni-list>
  </view>
</template>

<script setup lang="ts">
import uniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue'
import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue'
import { computed, reactive } from 'vue'
import ChatsListItem from '../components/ChatsListItem.vue'
// defineProps<{
// 	chatsList?: Array
// }>()
let keyWord = reactive({ value: '' })
let chatsList = reactive([
  {
    title: '互动消息',
    avatar:
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
    note: '暂无新的通知消息',
    time: '2022-9-13 10:30',
    badgeText: 2,
    iid: 1,
  },
  {
    title: '天天抢车位',
    avatar:
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
    note: '你的车车再不停就要生锈啦！',
    time: '2022-10-1 12:30',
    badgeText: 9,
    iid: 2,
  },
  {
    title: '陌陌',
    avatar:
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
    note: '距离12.7km [语音]',
    time: '2022-10-3 19:30',
    badgeText: 13,
    iid: 3,
  },
])

let filterList = computed(() => {
  return chatsList.filter((item) => {
    return item.title.indexOf(keyWord.value) !== -1
  })
})
</script>

<style scoped>
.search {
  position: relative;
  top: 25px;
}
.list {
  position: relative;
  top: 40px;
}
</style>
