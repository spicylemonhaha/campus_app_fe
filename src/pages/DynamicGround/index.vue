<template>
  <view>
    <HotTopics></HotTopics>
    <view class="ground-box">
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
      <DynamicCard
        v-for="item in dynamicList"
        :imglist="item.imglist"
        :userInfo="item.userInfo"
        :content="item.content"
        :key="item.userInfo.name"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import DynamicCard from '../../components/DynamicCard.vue'
import HotTopics from '../../components/HotTopics.vue'
import { ref } from 'vue'

const kindList = ref(['最新', '推荐', '同校'])
const active = ref('最新')
const changeTabColor = (tabName: string) => {
  active.value = tabName
}
const dynamicList = [
  {
    imglist: [
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    ],
    userInfo: {
      name: '某个同学',
      avatar: 'https://cdn.uviewui.com/uview/album/2.jpg',
    },
    content: '一个人的黄昏',
  },
  {
    imglist: [
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    ],
    userInfo: {
      name: '某个同学',
      avatar: 'https://cdn.uviewui.com/uview/album/2.jpg',
    },
    content: '一个人的黄昏',
  },
  {
    imglist: [
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    ],
    userInfo: {
      name: '某个同学',
      avatar: 'https://cdn.uviewui.com/uview/album/2.jpg',
    },
    content: '一个人的黄昏',
  },
  {
    imglist: [
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    ],
    userInfo: {
      name: '某个同学',
      avatar: 'https://cdn.uviewui.com/uview/album/2.jpg',
    },
    content: '一个人的黄昏',
  },
  {
    imglist: [
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1664434341235-f77a94e1a26c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    ],
    userInfo: {
      name: '某个同学',
      avatar: 'https://cdn.uviewui.com/uview/album/2.jpg',
    },
    content: '一个人的黄昏',
  },
]
</script>

<style scoped>
page {
  background-color: #f3f4f8;
}
.ground-box {
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
  border-bottom: 3px solid #1adbc2;
}
</style>
