<!-- eslint-disable @typescript-eslint/no-this-alias -->
<!-- eslint-disable @typescript-eslint/no-this-alias -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <view class="chat-room container">
    <view class="chat-warp" @click="isOpenBar = false">
      <view class="chat-content">
        <view
          v-for="item in msgs"
          class="chat-item"
          :class="item.direction == 0 ? 'self' : ''"
          :key="item.messageID"
        >
          <view class="chat-msg">
            <image
              v-if="getChatAvatar(item.senderUserID)"
              class="avatar"
              :src="getChatAvatar(item.senderUserID)"
            />
            <uni-icons v-else type="contact" class="avatar" size="32" />
            <view class="msg-content">
              <view class="name-box">{{ item.senderUserID }}</view>
              <view class="msg-box" v-if="item.thumbnailDownloadUrl">
                <image
                  mode="widthFix"
                  style="width: 240px"
                  :src="item.thumbnailDownloadUrl"
                ></image>
              </view>
              <view class="msg-box" v-else-if="item.videoFirstFrameDownloadUrl">
                <video
                  style="width: 240px"
                  :src="item.fileDownloadUrl"
                  :poster="item.videoFirstFrameDownloadUrl"
                />
              </view>
              <view class="msg-box" v-html="transMsg(item)" v-else></view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="send-input">
      <uni-icons type="plus" size="24" @click="isOpenBar = true"></uni-icons>
      <uni-search-bar
        style="flex: 1"
        placeholder=" "
        clearButton="none"
        cancelButton="always"
        cancelText="Send"
        @cancel="sendMessage"
      >
        <uni-icons slot="searchIcon" color="#999999" size="18" type="chat" />
      </uni-search-bar>
    </view>
    <uni-grid
      class="bottom-btn"
      :column="5"
      @change="clickBBtn"
      :showBorder="false"
      v-if="isOpenBar"
    >
      <uni-grid-item :showBorder="false">
        <view class="grid-item-box">
          <uni-icons
            :type="isByte ? 'paperplane-filled' : 'paperplane'"
            @click="isByte = !isByte"
            :size="30"
            color="#777"
          />
          <view class="text"></view>
        </view>
      </uni-grid-item>
      <!--  #ifdef  H5 || MP-WEIXIN -->
      <uni-grid-item
        :showBorder="false"
        v-for="item in featureBar"
        :key="item.name"
        :index="item.type"
      >
        <view class="grid-item-box">
          <uni-icons :type="item.name" :size="30" color="#777" />
          <view class="text"></view>
        </view>
      </uni-grid-item>
      <!--  #endif -->
    </uni-grid>
  </view>
</template>
<script setup>
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { zim } from '../../store'
import { transMsg, scroll2bottom } from './util.js'
import useStore from '../../store'
const store = useStore()
const convInfo = ref({})
const users = ref([])
const isByte = ref(false)
const isOpenBar = ref(false)
const featureBar = ref([
  {
    name: 'image',
    type: 11,
  },
])
onLoad((option) => {
  convInfo.value = {
    ...option,
    type: +option.type,
  }
  initEvent()
})
onShow(() => {
  queryHistoryMessage(convInfo.value)
})
const msgs = computed(() => {
  return store.state.chatMap[convInfo.value.id]
})
const getChatAvatar = (userID) => {
  return store.avatarMap[userID]
}
const initEvent = () => {
  zim.on('roomStateChanged', (zim, data) => {
    const { state, event, extendedData, roomID } = data
    const stateTips = ['Disconnect', 'connecting', 'connected']
    uni.showToast({
      title: stateTips[state],
      duration: 3000,
    })
    if (state == 0 && roomID == convInfo.value.id && convInfo.value.type == 1) {
      // this.routeBack();
    }
  })
  zim.on('roomMemberJoined', (zim, data) => {
    const { memberList, roomID } = data
    console.log('===roomMemberJoined===', memberList, roomID)
    if (roomID !== convInfo.value.id) return
    memberList.forEach((user) => {
      const userID = user.userID
      const index = this.users.findIndex((item) => userID === item.userID)
      if (index == -1) {
        users.value.push(user)
      }
    })
    queryRoomOnlineMemberCount()
  })
  zim.on('roomMemberLeft', (zim, data) => {
    const { memberList, roomID } = data
    if (roomID !== this.convInfo.id) return
    memberList.forEach((user) => {
      const userID = user.userID
      const index = users.value.findIndex((item) => userID === item.userID)
      if (index == -1) {
        users.value.splice(index, 1)
      }
    })
    queryRoomOnlineMemberCount()
  })
}
const queryHistoryMessage = (message) => {
  store
    .queryHistoryMessage(convInfo.value.id, +convInfo.value.type, {
      count: 1000,
      reverse: true,
    })
    .then(() => {
      scroll2bottom()
    })
}
const queryRoomOnlineMemberCount = () => {
  store.queryRoomOnlineMemberCount(convInfo.value.id).then((res) => {
    this.title = `${convInfo.value.name}(${res.count})`
  })
}
const sendMessage = (e) => {
  const { type, id } = convInfo.value
  const textMsg = e.value
  store.sendChatMessage(type, textMsg, id, isByte.value).then((res) => {
    scroll2bottom()
  })
}
const routeToRoomMembers = () => {
  uni.navigateTo({
    url: '../chat/memberList?roomID=' + convInfo.value.id,
  })
}
const actionHandle = () => {
  if (convInfo.value.type == 1) {
    routeToRoomMembers()
    return
  }

  if (convInfo.value.type == 2) {
    routeToGroupInfo()
    return null
  }
}
const routeBack = () => {
  if (convInfo.value.type == 1) {
    store.leaveRoom(convInfo.value.id)
  }
  if (msgs.value.length && convInfo.value.type !== 1) {
    store.clearConversationUnreadMessageCount(
      convInfo.value.id,
      +convInfo.value.type
    )
  }
  uni.switchTab({
    url: '../home/home',
  })
}
const routeToGroupInfo = () => {
  const paramsString =
    '?' +
    Object.keys(convInfo.value)
      .map((key) => `${key}=${convInfo.value[key]}`)
      .join('&')
  uni.navigateTo({
    url: '../group/info' + paramsString,
  })
}
const clickBBtn = (e) => {
  console.log(e)
  const type = e.detail.index
  if (type < 10) return
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-this-alias
  const that = this
  const params = {
    type,
  }
  if (type == 13) params.audioDuration = 5
  if (type == 14) params.videoDuration = 5
  // #ifdef H5
  let input = document.createElement('input')
  input.type = 'file'
  input.onchange = function () {
    const file = this.files[0]
    params.fileLocalPath = file
    store.sendMediaMessage(
      {
        ...params,
      },
      convInfo.value.id,
      convInfo.value.type,
      {},
      (message, currentSize, totalSize) => {
        console.warn('media')
      }
    )
    isOpenBar.value = false
    input = null
  }
  input.click()
  // #endif
  // #ifdef MP-WEIXIN
  wx.chooseMessageFile({
    count: 1,
    success(res) {
      console.warn('chooseMessageFile', res)
      const file = res.tempFiles[0].path
      store.sendMediaMessage(
        {
          fileLocalPath: res.tempFiles[0].path,
          fileName: res.tempFiles[0].name,
          fileSize: res.tempFiles[0].size,
          type,
        },
        convInfo.value.id,
        convInfo.value.type,
        {},
        (message, currentSize, totalSize) => {
          console.warn('file process', {
            message,
            currentSize,
            totalSize,
          })
        }
      )
      isOpenBar.value = false
    },
  })
  // #endif
}
</script>
<style lang="scss">
@import 'style.scss';
</style>
