import { defineStore } from 'pinia'
import { appConfig, avatarPrefix } from '../assets/config'

// #ifdef H5
import { ZIM } from 'zego-zim-web'
// #endif
/* eslint-disable */
// #ifdef MP
import { ZIM } from 'zego-zim-miniprogram'
// #endif
/* eslint-disable */
// #ifdef APP-PLUS
import ZIM from '../assets/js_sdk/zego-ZIMUniplugin-JS/lib'
// #endif
const zim = ZIM.create(appConfig.appID)

const useStore = defineStore('all', {
  state: () => {
    return {
      dev: true,
      isLogin: false,
      state: {
        convs: [],
        groupList: [],
        chatMap: {},
        user: {},
        unreadCount: 0,
      },
      totalMemberCount: 0,
      avatarMap: {},
    }
  },
  actions: {
    on_error(error) {
      console.log({ error })
      if (error && typeof error.code == 'number') {
        uni.hideToast()
        uni.showToast({
          title: `${error.code}: ${error.message}`,
          duration: 3000,
        })
        if (error.code == 6000121) {
          checkLoginHook()
        }
      }
      return Promise.reject(error)
    },
    on_unreadCountUpdate(newVal) {
      if (newVal > 0) {
        uni.setTabBarBadge({
          index: 0,
          text: newVal.toString(),
          complete: () => {
            console.log('complete')
          },
        })
      } else {
        uni.removeTabBarBadge({ index: 0 })
      }
    },

    setState(obj) {
      if (Object.prototype.toString.call(obj) !== '[object Object]') return
      for (const key in obj) {
        const value = obj[key]
        this.state[key] = value
      }
    },

    login(loginForm, token) {
      console.log({ loginForm, token })
      return zim
        .login(loginForm, token)
        .then((res) => {
          console.log('login res', res)
          // query self extendedData
          zim.queryUsersInfo([loginForm.userID]).then(({ userList }) => {
            const user = userList[0]
            if (user && user.extendedData) {
              this.$set(
                this.avatarMap,
                loginForm.userID,
                JSON.parse(user.extendedData).avatar
              )
              console.log('avatarMap', JSON.stringify(this.avatarMap))
            }
          })
        })
        .catch(this.on_error)
    },

    logout() {
      return zim.logout()
    },

    setAvatarMap(ids) {
      if (!ids || !ids.length) return
      zim.queryUsersInfo(ids).then(({ userList }) => {
        userList.forEach((item) => {
          if (item.extendedData) {
            this.$set(
              this.avatarMap,
              item.baseInfo.userID,
              JSON.parse(item.extendedData).avatar
            )
          }
        })
      })
      console.log('avatarMap', JSON.stringify(this.avatarMap))
    },

    updateUserInfo(name, avatar) {
      avatar = avatarPrefix + avatar
      if (zim.updateUserName) {
        zim.updateUserName(name).then(() => {
          this.state.user.userName = name
        })
      } else {
        this.state.user.userName = name
      }

      if (zim.updateUserExtendedData) {
        zim.updateUserExtendedData(JSON.stringify({ avatar })).then(() => {
          this.$set(this.avatarMap, this.state.user.userID, avatar)
          console.log('avatarMap', JSON.stringify(this.avatarMap))
        })
      } else {
        this.$set(this.avatarMap, this.state.user.userID, avatar)
      }
    },

    setMessage(id, messages) {
      console.log('------------------------------')
      console.log(id, messages)
      if (!this.state.chatMap[id]) this.state.chatMap[id] = []
      messages = messages.sort((a, b) => a.orderKey - b.orderKey)
      console.log(this.state.chatMap[id])
      this.state.chatMap[id].push(...messages)
    },

    queryConversationList() {
      return zim
        .queryConversationList({
          count: 100,
        })
        .then((res) => {
          console.warn('queryConversationList', res)
          this.state.convs = res.conversationList
          this.state.unreadCount = this.getConversationUnreadMessageCount()
          this.on_unreadCountUpdate(this.state.unreadCount)
          const ids = []
          res.conversationList.forEach((item) => {
            if (!item.type) ids.push(item.conversationID)
          })
          this.setAvatarMap(ids)
          return res
        })
        .catch(this.on_error)
    },

    setConversationNotificationStatus(status, id, type) {
      return zim
        .setConversationNotificationStatus(status, id, type)
        .catch(this.on_error)
    },

    getConversationUnreadMessageCount() {
      return this.state.convs.reduce((prev, curr) => {
        const count =
          curr.unreadMessageCount <= 0 || curr.notificationStatus == 2
            ? 0
            : curr.unreadMessageCount
        return prev + count
      }, 0)
    },

    clearConversationUnreadMessageCount(convID, type) {
      return zim
        .clearConversationUnreadMessageCount(convID, type)
        .catch(this.on_error)
    },

    queryHistoryMessage(convID, type, config) {
      // orderKey-排序、去重
      return zim
        .queryHistoryMessage(convID, type, config)
        .then((res) => {
          console.warn('queryHistoryMessage', res)
          this.state.chatMap.convID = []
          this.setMessage(convID, res.messageList)
          return res
        })
        .catch(this.on_error)
    },

    sendChatMessage(type, message, convID, isByte = false) {
      const typeMap = {
        0: 'sendPeerMessage',
        1: 'sendRoomMessage',
        2: 'sendGroupMessage',
      }
      const fn = typeMap[type]
      if (!fn) return Promise.reject()

      message = isByte
        ? Uint8Array.from(
            Array.from(unescape(encodeURIComponent(message))).map((c) =>
              c.charCodeAt(0)
            )
          )
        : message
      const msgType = isByte ? 2 : 1
      console.warn('==sendChatMessage==', { type, message, convID, isByte })
      return zim[fn]({ message, type: msgType }, convID, { priority: 2 })
        .then((res) => {
          console.warn('==sendChatMessage message==', res.message)
          this.setMessage(convID, [res.message])
          return res
        })
        .catch(this.on_error)
    },

    sendMediaMessage(message, convID, convType, config, progress) {
      const _config = { priority: 2, ...config }
      return zim
        .sendMediaMessage(message, convID, convType, _config, progress)
        .then((res) => {
          this.setMessage(convID, [res.message])
          return res
        })
        .catch((err) => {
          this.on_error(err)
        })
    },

    createGroup(groupInfo, users, config = {}) {
      return zim
        .createGroup(
          {
            groupID: groupInfo.groupID,
            groupName: groupInfo.groupName,
          },
          users,
          {
            groupAttributes: {},
            groupNotice: '',
            ...config,
          }
        )
        .catch(this.on_error)
    },

    joinGroup(groupID) {
      return zim.joinGroup(groupID).catch(this.on_error)
    },

    setGroupAttributes(groupID, groupAttributes) {
      return zim
        .setGroupAttributes(groupAttributes, groupID)
        .catch(this.on_error)
    },

    queryGroupAttributes(groupID, keys) {
      if (keys?.length) {
        return zim.queryGroupAttributes(keys, groupID).catch(this.on_error)
      }

      return zim.queryGroupAllAttributes(groupID).catch(this.on_error)
    },

    createRoom(roomInfo, roomAttr = {}) {
      const { roomID, roomName } = roomInfo
      return zim.createRoom({ roomID, roomName }).catch(this.on_error)
    },

    joinRoom(roomID) {
      return zim.joinRoom(roomID).catch(this.on_error)
    },

    leaveRoom(roomID) {
      return zim.leaveRoom(roomID).catch(this.on_error)
    },

    getGroupList() {
      return zim
        .queryGroupList()
        .then((res) => {
          console.warn('==getGroupList==', res)
          this.$set(this.state, 'groupList', res.groupList)
          return res
        })
        .catch(this.on_error)
    },

    updateGroupName(groupID, groupName) {
      return zim.updateGroupName(groupName, groupID).catch(this.on_error)
    },

    updateGroupNotice(groupID, groupNotice) {
      return zim.updateGroupNotice(groupNotice, groupID).catch(this.on_error)
    },

    transferGroupOwner(groupID, userID) {
      return zim.transferGroupOwner(userID, groupID).catch(this.on_error)
    },

    inviteUsersIntoGroup(groupID, userIDs) {
      return zim.inviteUsersIntoGroup(userIDs, groupID).catch(this.on_error)
    },

    kickGroupMembers(groupID, userIDs) {
      return zim.kickGroupMembers(userIDs, groupID).catch(this.on_error)
    },

    queryGroupMemberList(groupID, config) {
      return zim
        .queryGroupMemberList(groupID, config)
        .then((res) => {
          const ids = res.userList.map((item) => item.userID)
          this.setAvatarMap(ids)
          return res
        })
        .catch(this.on_error)
    },

    queryGroupMemberCount(groupID) {
      return zim
        .queryGroupMemberCount(groupID)
        .then((res) => {
          this.totalMemberCount = res.count
          return res
        })
        .catch(this.on_error)
    },

    queryGroupInfo(groupID) {
      return zim.queryGroupInfo(groupID).catch(this.on_error)
    },

    deleteConversation(id, type, config) {
      const _config = {
        isAlsoDeleteServerConversation: true,
        isAlsoDeleteLocalHistoryMessage: true,
        ...config,
      }
      return zim.deleteConversation(id, type, _config).catch(this.on_error)
    },

    leaveGroup(groupID) {
      return zim
        .leaveGroup(groupID)
        .then((res) => {
          const index = this.state.groupList.findIndex(
            (item) => item.groupID == groupID
          )
          index !== -1 && this.state.groupList.splice(index, -1)
          return res
        })
        .catch(this.on_error)
    },

    dismissGroup(groupID) {
      return zim
        .dismissGroup(groupID)
        .then((res) => {
          const index = this.state.groupList.findIndex(
            (item) => item.groupID == groupID
          )
          index !== -1 && this.state.groupList.splice(index, -1)
          return res
        })
        .catch(this.on_error)
    },

    queryRoomMember(roomID) {
      const config = {
        nextFlag: '',
        count: 100,
      }
      return zim
        .queryRoomMemberList(roomID, config)
        .then((res) => {
          console.warn(res.memberList)
          const ids = res.memberList.map((item) => item.userID)
          this.setAvatarMap(ids)
          return res
        })
        .catch(this.on_error)
    },

    queryRoomOnlineMemberCount(roomID) {
      return zim
        .queryRoomOnlineMemberCount(roomID)
        .then((res) => {
          this.totalMemberCount = res.count
          return res
        })
        .catch(this.on_error)
    },
  },
})
function checkLoginHook(cb) {
  const store = useStore()
  const errorHandle = () => {
    cb && cb()
    uni.removeStorageSync('userInfo')
    uni.removeStorageSync('token')
    store.isLogin = false
  }

  try {
    const userInfo = uni.getStorageSync('userInfo')
    const token = uni.getStorageSync('token')
    console.warn({ userInfo, token })
    if (userInfo && token) {
      const loginForm = JSON.parse(userInfo)
      store
        .login(loginForm, token)
        .then(() => {
          store.state.user = loginForm
          if (cb) {
            cb().$nextTick(() => {
              // TODO:维持登录态
            })
          }
        })
        .catch((err) => {
          console.error(1, { err })
          errorHandle()
        })
    } else {
      errorHandle()
    }
  } catch (err) {
    console.error(2, { err })
    console.error(err)
    // error
  }
}
export default useStore
export { zim }
