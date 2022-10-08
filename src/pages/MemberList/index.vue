<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <view class="container">
    <scroll-view scroll-y="true">
      <uni-list-chat
        :clickable="true"
        @click="intoChat(item)"
        v-for="item in convs"
        :key="item.conversationID"
        :showBadge="!!item.unreadMessageCount"
        :badgeText="
          item.notificationStatus == 2 && item.type == 2
            ? 0
            : (item.unreadMessageCount > 0 && item.unreadMessageCount) || 0
        "
        badge-positon="left"
        badge-text="dot"
        :title="item | (`${item.conversationName || item.conversationID}` as any)"
        :avatar="getConvAvatar(item.conversationID, item.type)"
        :note="
          item | item.lastMessage && item.lastMessage.message
            ? item.lastMessage.message.length > 20
              ? item.lastMessage.message.slice(0, 20) + '...'
              : item.lastMessage.message
            : ''
        "
      >
        <view style="text-align: right; font-size: small">
          <view class="chat-custom-text">{{
            item | item.lastMessage
              ? timestampToTime(item.lastMessage.timestamp)
              : ''
          }}</view>
          <uni-icons
            v-if="item.type == 2"
            :type="item.notificationStatus == 2 ? 'eye-slash-filled' : 'eye'"
            color="#999"
            size="18"
            @click.native.stop="setConversationNotificationStatus(item)"
          ></uni-icons>
        </view>
      </uni-list-chat>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { avatarPrefix } from '../../assets/config'
import baseNavBar from '../../components/baseNavBar/base-nav-bar.vue'
import useStore from '../../store/index'
import { computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
function timestampToTime(timestamp: any) {
  var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  var D = date.getDate() + ' '
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + M + D + h + m + s
}
const store = useStore()

const convs = computed(() => {
  return store.state.convs
})
onShow(() => {
  setTimeout(() => {
    store.queryConversationList()
  }, 500)
})

const intoChat = (item: any) => {
  console.warn('intoChat', item)
  store
    .clearConversationUnreadMessageCount(item.conversationID, item.type)
    .then(() => {
      const convInfo = {
        id: item.conversationID,
        type: item.type,
        name: item.conversationName,
      }
      const paramsString =
        '?' +
        Object.keys(convInfo)
          .map((key) => `${key}=${convInfo[key]}`)
          .join('&')
      uni.navigateTo({
        url: '../Chat/index' + paramsString,
      })
    })
}
const setConversationNotificationStatus = (item: any) => {
  console.warn('setConversationNotificationStatus', item)
  const status = item.notificationStatus == 2 ? 1 : 2
  store
    .setConversationNotificationStatus(status, item.conversationID, 2)
    .then(() => {
      store.queryConversationList()
    })
}
const getConvAvatar = (convID: any, convType: any) => {
  if (convType == 2) return avatarPrefix + 'group.jpeg'
  const img =
    'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
  return store.avatarMap[convID] || img
}
</script>

<style lang="scss"></style>
