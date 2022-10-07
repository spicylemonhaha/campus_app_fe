<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <view class="content">
    <view class="item">
      <detail userName="浅浅" :userInfo="userInfo"></detail>
      <comment
        :isOther="false"
        content="哈哈哈哈哈哈哈哈哈哈哈哈哈"
        :change="changeComment"
      ></comment>
      <view
        style="
          height: 120rpx;
          border-bottom: 1rpx solid lightgrey;
          border-top: 1rpx solid lightgrey;
          display: flex;
          align-items: center;
        "
      >
        <image
          src="../../static/logo.png"
          style="width: 60rpx; height: 60rpx; border-radius: 60rpx"
        ></image>
        <span style="margin-left: 20rpx; font-size: 8rpx">等xxx人点赞</span>
      </view>
      <view>
        <uni-notice-bar show-icon text="长按评论可举报或删除哦!" />
      </view>
      <view>
        <uni-section title="评论xxx" type="line" titleFontSize="20px">
          <view
            v-for="(item, index) in comments"
            @longpress="deleteOne($event, item)"
            :key="index"
          >
            <detail
              :isBtn="false"
              :userName="item.name"
              :userInfo="item.info"
            ></detail>
            <view style="margin-left: 80rpx">
              <comment
                :content="item.content"
                :zans="item.zans"
                :comment="item"
                key="key"
                :add="add"
                :change="changeComment"
              ></comment>
              <view
                v-for="(com, index) in item.otherComment"
                style="background-color: whitesmoke; border-radius: 60rpx"
                :key="index"
              >
                <detail
                  :isBtn="false"
                  :userName="com.name"
                  :userInfo="com.info"
                ></detail>
                <view style="margin-left: 80rpx">
                  <comment
                    :content="com.content"
                    :zans="com.zans"
                    :comment="com"
                    key="key"
                    :add="add"
                    :change="changeComment"
                  ></comment>
                </view>
              </view>
            </view>
          </view>
        </uni-section>
      </view>
    </view>
    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog
        type="success"
        cancelText="删除"
        confirmText="举报"
        title="提示信息"
        @confirm="tipItem"
        @close="deleteItem"
      ></uni-popup-dialog>
    </uni-popup>
    <view class="comment-input">
      <uni-search-bar
        v-model="message"
        style="flex: 1"
        placeholder=" "
        clearButton="none"
        cancelButton="always"
        cancelText="发送"
        @cancel="sendMessage"
      >
        <uni-icons slot="searchIcon" color="#999999" size="18" type="chat" />
      </uni-search-bar>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import uniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue'
import uniPopupDialog from '@dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog.vue'
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue'
import uniSection from '@dcloudio/uni-ui/lib/uni-section/uni-section.vue'
import uniNoticeBar from '@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar.vue'
const alertDialog = ref<any>(null)
const currentComment = ref<commentType>()
const changeComment = function (event: Event, item: commentType) {
  currentComment.value = item
  console.log(currentComment.value)
}
type infoType = {
  age: string
  address: string
  edu: string
  job: string
}
type commentType = {
  name: string
  info: infoType
  content: string
  zans: number
  otherComment?: commentType[]
}
const comments = ref([
  {
    name: '赫赫',
    info: {
      age: '97年',
      address: '北京',
      edu: '本科',
      job: 'IT/互联网',
    },
    content: '和恩恩和耳环和暗黑世界二哈结合客户计划',
    zans: 122,
    otherComment: [
      {
        name: '咪咪',
        info: {
          age: '02年',
          address: '杭州',
          edu: '博士',
          job: 'IT/互联网',
        },
        content: '和恩恩和耳环',
        zans: 1,
      },
    ],
  },
  {
    name: '阿达',
    info: {
      age: '97年',
      address: '北京',
      edu: '本科',
      job: 'IT/互联网',
    },
    content: '阿松地建瓯气温很低哦亲我都i请问打开了',
    zans: 166,
  },
  {
    name: '卡卡',
    info: {
      age: '97年',
      address: '北京',
      edu: '本科',
      job: 'IT/互联网',
    },
    content: '区埃斯珀发泡富婆开发怕送蒂帕松动皮哦破',
    zans: 1777,
  },
  {
    name: '拉拉',
    info: {
      age: '97年',
      address: '北京',
      edu: '本科',
      job: 'IT/互联网',
    },
    content: '拼凑i去外婆欸哦ask懒散了才把僵尸打死的',
    zans: 1,
  },
  {
    name: '拿拿',
    info: {
      age: '97年',
      address: '北京',
      edu: '本科',
      job: 'IT/互联网',
    },
    content: '脾气我批饿哦吃辣收到后i阿斯顿急啊离开',
    zans: 12,
  },
])
const userInfo = ref({
  age: '97年',
  address: '北京',
  edu: '本科',
  job: 'IT/互联网',
})
const deleteOne = function (event: Event, item: commentType) {
  curComment.value = item
  console.log(curComment.value)
  alertDialog.value.open()
}
const curComment = ref<commentType | null>(null)
const deleteItem = function () {
  for (let i = 0; i < comments.value.length; i++) {
    if (comments.value[i].name === (curComment.value as commentType).name) {
      comments.value.splice(i, 1)
    }
  }

  alertDialog.value.close()
}
const message = ref('')
const tipItem = function (name: any) {
  alertDialog.value.close()
}
const add = function (event: Event, comment: commentType) {
  comment.zans++
}
const sendMessage = function () {
  console.log(currentComment.value)
  console.log(message.value)
}
</script>

<style>
.comment-input {
  position: fixed;
  width: 100%;
  background-color: white;
  box-sizing: border-box;
  bottom: 95rpx;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
}
.item {
  background-color: white;
  width: 95%;
  margin-left: 5rpx;
  margin-top: 20rpx;
  border-radius: 40rpx;
}
</style>
