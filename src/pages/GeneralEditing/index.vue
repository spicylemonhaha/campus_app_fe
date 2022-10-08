<template>
  <view class="content">
    <uni-section
      title="标签选择"
      type="line"
      padding
      titleFontSize="20px"
      class="select"
    >
      <view class="tags">
        <view class="tag-view tag" v-for="(item, index) in mock" :key="index">
          <uni-tag
            :text="item.content"
            :type="item.type"
            circle="true"
            size="default"
            @click="addTag($event, item)"
          />
        </view>
      </view>
    </uni-section>
    <uni-title
      type="h1"
      title="日常生活中, 你有什么爱好？"
      class="title"
    ></uni-title>
    <view class="text-input">
      <uni-easyinput
        type="textarea"
        v-model="value"
        placeholder="例如:   编程"
        autoHeight="true"
        maxlength="-1"
      ></uni-easyinput>
    </view>
    <uni-title type="h1" title="试试这样写:" class="title"></uni-title>
    <view class="text-example">
      <view class="contain-example">
        <view class="tag-view tag-example">
          <uni-tag text="阅读" type="primary" circle="true" size="default" />
        </view>
        <uni-easyinput
          style="margin-left: 5rpx"
          type="textarea"
          value="可以让我们感到充实。当一个人无所事事的时候，内心是比较空虚的，而且想的东西也是非常多的，容易胡思乱想。但是当在无聊闲暇的时间去阅读，那么就会感到人生是饱满的，很多的人生经验和人生道理，在书籍中可以获得，并且能够感受到那种温暖的感觉，觉得人生就应该要去努力追求自己想要的人生。"
          autoHeight="true"
          maxlength="-1"
          disabled="true"
        ></uni-easyinput>
      </view>
    </view>
    <button type="primary" style="margin-top: 30rpx; width: 50%" @click="haha">
      提交
    </button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { addCommentLike } from '../../api'
type tagType = {
  type: string
  content: string
}
const haha = async () => {
  const res = await addCommentLike({
    dynamicId: '123',
    commentId: '123',
    userId: '123',
  })
  console.log(res)
}
const value = ref('')
const mock = ref([
  {
    type: 'warning',
    content: '啦啦',
  },
  {
    type: 'warning',
    content: '广泛',
  },
  {
    type: 'warning',
    content: '啦东',
  },
  {
    type: 'warning',
    content: '啦啦滴',
  },
  {
    type: 'warning',
    content: '啦啦大',
  },
  {
    type: 'warning',
    content: '啦啦沙',
  },
  {
    type: 'warning',
    content: '啦啦敌',
  },
  {
    type: 'warning',
    content: '啦啦试',
  },
])
const tags = ref<string[]>([])
const addTag = function (event: Event, item: tagType) {
  const index = tags.value.indexOf(item.content)
  if (index === -1) {
    tags.value.push(item.content)
    item.type = 'primary'
  } else {
    tags.value.splice(index, 1)
    item.type = 'warning'
  }
  console.log(tags.value)
}
const submit = function () {
  const temp = tags.value.map((item) => item)
  const param = {
    tags: temp,
    hobby: value.value,
  }
  console.log(param)
  //axios.get('url',param)
}
</script>

<style>
.tags {
  display: flex;
  flex-wrap: wrap;
  border: 1rpx solid black;
  border-radius: 20rpx;
}
.tag {
  margin-top: 20rpx;
  margin-bottom: 20rpx;
  margin-left: 20rpx;
  text-align: center;
}
.tag-example {
}
.title {
  margin-left: 30rpx;
  margin-top: 20rpx;
  margin-bottom: 20rpx;
}
.text-input {
  width: 95%;
  margin-left: 20rpx;
}
.text-example {
  display: flex;
  width: 95%;
  margin-left: 20rpx;
  border: 1rpx solid black;
  border-radius: 20rpx;
}
.contain-example {
  display: flex;
  width: 95%;
  margin-left: 10rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-image: url('../../static/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.select {
  background-image: url('../../static/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
