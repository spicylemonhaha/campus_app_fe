import { ZIMManager } from './ZIMManager'
const ZIMNativeModule = uni.requireNativePlugin(
  'zego-ZIMUniPlugin_ZIMUniEngine'
)
const ZIMEvent = uni.requireNativePlugin('globalEvent')
const Prefix = ZIMNativeModule.prefix()
export class ZIMEngine {
  handle
  appID
  appSign
  uploadingMap
  downloadingMap
  eventNameList
  static _callMethod(method, args = {}) {
    return new Promise((resolve, reject) => {
      ZIMNativeModule.callMethod(
        { method, args },
        (res) => {
          // console.log(`[ZIM][API][I] ${method}: ${JSON.stringify(res)}`);
          resolve(res)
        },
        (err) => {
          // console.log(`[ZIM][API][E] ${method}: ${JSON.stringify(err)}`);
          reject(err)
        }
      )
    })
  }
  constructor(handle, appID, appSign) {
    this.handle = handle
    this.appID = appID
    this.appSign = appSign
    this.uploadingMap = new Map()
    this.downloadingMap = new Map()
    this.eventNameList = [
      'connectionStateChanged',
      'error',
      'tokenWillExpire',
      'conversationChanged',
      'conversationTotalUnreadMessageCountUpdated',
      'receivePeerMessage',
      'receiveGroupMessage',
      'receiveRoomMessage',
      'roomStateChanged',
      'roomMemberJoined',
      'roomMemberLeft',
      'roomAttributesUpdated',
      'roomAttributesBatchUpdated',
      'groupStateChanged',
      'groupNameUpdated',
      'groupAvatarUrlUpdated',
      'groupNoticeUpdated',
      'groupAttributesUpdated',
      'groupMemberStateChanged',
      'groupMemberInfoUpdated',
      'callInvitationReceived',
      'callInvitationCancelled',
      'callInvitationTimeout',
      'callInvitationAccepted',
      'callInvitationRejected',
      'callInviteesAnsweredTimeout',
    ]
  }
  create() {
    return ZIMEngine._callMethod('createEngine', {
      handle: this.handle.toString(),
      appID: this.appID,
      appSign: this.appSign,
    })
  }
  destroy() {
    for (let event of this.eventNameList) {
      ZIMEvent.removeEventListener(Prefix + event)
    }
    return ZIMEngine._callMethod('destroyEngine', {
      handle: this.handle.toString(),
    })
  }
  uploadLog() {
    return ZIMEngine._callMethod('uploadLog', {
      handle: this.handle.toString(),
    })
  }
  on(type, listener) {
    const native_listener = (res) => {
      const { handle, data } = res
      const engine = ZIMManager.engineMap.get(handle)
      console.log(`[ZIM][Event] ${type}: ${JSON.stringify(data)}`)
      // @ts-ignore
      listener(engine, ...data)
    }
    let map = ZIMManager.listeners.get(type)
    if (map === undefined) {
      map = new Map()
      ZIMManager.listeners.set(type, map)
    }
    map.set(listener, native_listener)
    ZIMEvent.addEventListener(Prefix + type, native_listener)
  }
  off(type) {
    ZIMEvent.removeEventListener(Prefix + type)
    ZIMManager.listeners.delete(type)
  }
  login(userInfo, token) {
    return ZIMEngine._callMethod('login', {
      handle: this.handle.toString(),
      userInfo,
      token,
    })
  }
  logout() {
    return ZIMEngine._callMethod('logout', { handle: this.handle.toString() })
  }
  renewToken(token) {
    return ZIMEngine._callMethod('renewToken', {
      handle: this.handle.toString(),
      token,
    })
  }
  updateUserName(userName) {
    return ZIMEngine._callMethod('updateUserName', {
      handle: this.handle.toString(),
      userName,
    })
  }
  updateUserAvatarUrl(userAvatarUrl) {
    return ZIMEngine._callMethod('updateUserAvatarUrl', {
      handle: this.handle.toString(),
      userAvatarUrl,
    })
  }
  updateUserExtendedData(extendedData) {
    return ZIMEngine._callMethod('updateUserExtendedData', {
      handle: this.handle.toString(),
      extendedData,
    })
  }
  queryUsersInfo(userIDs, config) {
    return ZIMEngine._callMethod('queryUsersInfo', {
      handle: this.handle.toString(),
      userIDs,
      config,
    })
  }
  // MARK: - Conversation
  queryConversationList(config) {
    return ZIMEngine._callMethod('queryConversationList', {
      handle: this.handle.toString(),
      config,
    })
  }
  deleteConversation(conversationID, conversationType, config) {
    return ZIMEngine._callMethod('deleteConversation', {
      handle: this.handle.toString(),
      conversationID,
      conversationType,
      config,
    })
  }
  setConversationNotificationStatus(status, conversationID, conversationType) {
    return ZIMEngine._callMethod('setConversationNotificationStatus', {
      handle: this.handle.toString(),
      status,
      conversationID,
      conversationType,
    })
  }
  clearConversationUnreadMessageCount(conversationID, conversationType) {
    return ZIMEngine._callMethod('clearConversationUnreadMessageCount', {
      handle: this.handle.toString(),
      conversationID,
      conversationType,
    })
  }
  sendMessage(message, conversationID, conversationType, config) {
    return ZIMEngine._callMethod('sendMessage', {
      handle: this.handle.toString(),
      message,
      conversationID,
      conversationType,
      config,
    })
  }
  sendMediaMessage(
    message,
    toConversationID,
    conversationType,
    config,
    progress
  ) {
    const native_progress_listener = (res) => {
      const { progressHandle, data } = res
      const progress = this.uploadingMap.get(progressHandle)
      // @ts-ignore
      progress?.(...data)
    }
    const type = 'mediaUploadingProgress'
    ZIMEvent.addEventListener(Prefix + type, native_progress_listener)
    const progressHandle = Symbol(Math.round(Math.random() * 10000))
    this.uploadingMap.set(progressHandle.toString(), progress)
    const methodName = 'sendMediaMessage'
    return new Promise((resolve, reject) => {
      ZIMNativeModule.callMethod(
        {
          method: methodName,
          args: {
            handle: this.handle.toString(),
            message,
            toConversationID,
            conversationType,
            config,
            progressHandle: progressHandle.toString(),
          },
        },
        (res) => {
          ZIMEvent.removeEventListener(Prefix + type, native_progress_listener)
          this.uploadingMap.delete(progressHandle.toString())
          // console.log(`[ZIM][API][I] ${methodName}: ${JSON.stringify(res)}`);
          resolve(res)
        },
        (err) => {
          ZIMEvent.removeEventListener(Prefix + type, native_progress_listener)
          this.uploadingMap.delete(progressHandle.toString())
          // console.log(`[ZIM][API][E] ${methodName}: ${JSON.stringify(err)}`);
          reject(err)
        }
      )
    })
  }
  deleteMessages(messageList, conversationID, conversationType, config) {
    return ZIMEngine._callMethod('deleteMessages', {
      handle: this.handle.toString(),
      messageList,
      conversationID,
      conversationType,
      config,
    })
  }
  deleteAllMessage(conversationID, conversationType, config) {
    return ZIMEngine._callMethod('deleteAllMessage', {
      handle: this.handle.toString(),
      conversationID,
      conversationType,
      config,
    })
  }
  queryHistoryMessage(conversationID, conversationType, config) {
    return ZIMEngine._callMethod('queryHistoryMessage', {
      handle: this.handle.toString(),
      conversationID,
      conversationType,
      config,
    })
  }
  downloadMediaFile(message, fileType, progress) {
    const native_progress_listener = (res) => {
      const { progressHandle, data } = res
      const progress = this.downloadingMap.get(progressHandle)
      // @ts-ignore
      progress?.(...data)
    }
    const type = 'mediaDownloadingProgress'
    ZIMEvent.addEventListener(Prefix + type, native_progress_listener)
    const progressHandle = Symbol(Math.round(Math.random() * 10000))
    this.downloadingMap.set(progressHandle.toString(), progress)
    const methodName = 'downloadMediaFile'
    return new Promise((resolve, reject) => {
      ZIMNativeModule.callMethod(
        {
          method: methodName,
          args: {
            handle: this.handle.toString(),
            message,
            fileType,
            progressHandle: progressHandle.toString(),
          },
        },
        (res) => {
          ZIMEvent.removeEventListener(Prefix + type, native_progress_listener)
          this.downloadingMap.delete(progressHandle.toString())
          // console.log(`[ZIM][API][I] ${methodName}: ${JSON.stringify(res)}`);
          resolve(res)
        },
        (err) => {
          ZIMEvent.removeEventListener(Prefix + type, native_progress_listener)
          this.downloadingMap.delete(progressHandle.toString())
          // console.log(`[ZIM][API][E] ${methodName}: ${JSON.stringify(err)}`);
          reject(err)
        }
      )
    })
  }
  // MARK: - Room
  createRoom(roomInfo, config) {
    return ZIMEngine._callMethod('createRoom', {
      handle: this.handle.toString(),
      roomInfo,
      config,
    })
  }
  enterRoom(roomInfo, config) {
    return ZIMEngine._callMethod('enterRoom', {
      handle: this.handle.toString(),
      roomInfo,
      config,
    })
  }
  joinRoom(roomID) {
    return ZIMEngine._callMethod('joinRoom', {
      handle: this.handle.toString(),
      roomID,
    })
  }
  leaveRoom(roomID) {
    return ZIMEngine._callMethod('leaveRoom', {
      handle: this.handle.toString(),
      roomID,
    })
  }
  queryRoomMemberList(roomID, config) {
    return ZIMEngine._callMethod('queryRoomMemberList', {
      handle: this.handle.toString(),
      roomID,
      config,
    })
  }
  queryRoomOnlineMemberCount(roomID) {
    return ZIMEngine._callMethod('queryRoomOnlineMemberCount', {
      handle: this.handle.toString(),
      roomID,
    })
  }
  queryRoomAllAttributes(roomID) {
    return ZIMEngine._callMethod('queryRoomAllAttributes', {
      handle: this.handle.toString(),
      roomID,
    })
  }
  setRoomAttributes(roomAttributes, roomID, config) {
    return ZIMEngine._callMethod('setRoomAttributes', {
      handle: this.handle.toString(),
      roomAttributes,
      roomID,
      config,
    })
  }
  deleteRoomAttributes(keys, roomID, config) {
    return ZIMEngine._callMethod('deleteRoomAttributes', {
      handle: this.handle.toString(),
      keys,
      roomID,
      config,
    })
  }
  beginRoomAttributesBatchOperation(roomID, config) {
    return ZIMEngine._callMethod('beginRoomAttributesBatchOperation', {
      handle: this.handle.toString(),
      roomID,
      config,
    })
  }
  endRoomAttributesBatchOperation(roomID) {
    return ZIMEngine._callMethod('endRoomAttributesBatchOperation', {
      handle: this.handle.toString(),
      roomID,
    })
  }
  // MARK: - Group
  createGroup(groupInfo, userIDs, config) {
    return ZIMEngine._callMethod('createGroup', {
      handle: this.handle.toString(),
      groupInfo,
      userIDs,
      config,
    })
  }
  joinGroup(groupID) {
    return ZIMEngine._callMethod('joinGroup', {
      handle: this.handle.toString(),
      groupID,
    })
  }
  leaveGroup(groupID) {
    return ZIMEngine._callMethod('leaveGroup', {
      handle: this.handle.toString(),
      groupID,
    })
  }
  dismissGroup(groupID) {
    return ZIMEngine._callMethod('dismissGroup', {
      handle: this.handle.toString(),
      groupID,
    })
  }
  queryGroupList() {
    return ZIMEngine._callMethod('queryGroupList', {
      handle: this.handle.toString(),
    })
  }
  updateGroupNotice(groupNotice, groupID) {
    return ZIMEngine._callMethod('updateGroupNotice', {
      handle: this.handle.toString(),
      groupNotice,
      groupID,
    })
  }
  updateGroupName(groupName, groupID) {
    return ZIMEngine._callMethod('updateGroupName', {
      handle: this.handle.toString(),
      groupName,
      groupID,
    })
  }
  updateGroupAvatarUrl(groupAvatarUrl, groupID) {
    return ZIMEngine._callMethod('updateGroupAvatarUrl', {
      handle: this.handle.toString(),
      groupAvatarUrl,
      groupID,
    })
  }
  queryGroupInfo(groupID) {
    return ZIMEngine._callMethod('queryGroupInfo', {
      handle: this.handle.toString(),
      groupID,
    })
  }
  setGroupAttributes(groupAttributes, groupID) {
    return ZIMEngine._callMethod('setGroupAttributes', {
      handle: this.handle.toString(),
      groupAttributes,
      groupID,
    })
  }
  deleteGroupAttributes(keys, groupID) {
    return ZIMEngine._callMethod('deleteGroupAttributes', {
      handle: this.handle.toString(),
      keys,
      groupID,
    })
  }
  queryGroupAttributes(keys, groupID) {
    return ZIMEngine._callMethod('queryGroupAttributes', {
      handle: this.handle.toString(),
      keys,
      groupID,
    })
  }
  queryGroupAllAttributes(groupID) {
    return ZIMEngine._callMethod('queryGroupAllAttributes', {
      handle: this.handle.toString(),
      groupID,
    })
  }
  setGroupMemberNickname(nickname, forUserID, groupID) {
    return ZIMEngine._callMethod('setGroupMemberNickname', {
      handle: this.handle.toString(),
      nickname,
      forUserID,
      groupID,
    })
  }
  setGroupMemberRole(role, forUserID, groupID) {
    return ZIMEngine._callMethod('setGroupMemberRole', {
      handle: this.handle.toString(),
      role,
      forUserID,
      groupID,
    })
  }
  transferGroupOwner(toUserID, groupID) {
    return ZIMEngine._callMethod('transferGroupOwner', {
      handle: this.handle.toString(),
      toUserID,
      groupID,
    })
  }
  queryGroupMemberInfo(userID, groupID) {
    return ZIMEngine._callMethod('queryGroupMemberInfo', {
      handle: this.handle.toString(),
      userID,
      groupID,
    })
  }
  inviteUsersIntoGroup(userIDs, groupID) {
    return ZIMEngine._callMethod('inviteUsersIntoGroup', {
      handle: this.handle.toString(),
      userIDs,
      groupID,
    })
  }
  kickGroupMembers(userIDs, groupID) {
    return ZIMEngine._callMethod('kickGroupMembers', {
      handle: this.handle.toString(),
      userIDs,
      groupID,
    })
  }
  queryGroupMemberList(groupID, config) {
    return ZIMEngine._callMethod('queryGroupMemberList', {
      handle: this.handle.toString(),
      groupID,
      config,
    })
  }
  queryGroupMemberCount(groupID) {
    return ZIMEngine._callMethod('queryGroupMemberCount', {
      handle: this.handle.toString(),
      groupID,
    })
  }
  // MARK: - Call
  callInvite(invitees, config) {
    return ZIMEngine._callMethod('callInvite', {
      handle: this.handle.toString(),
      invitees,
      config,
    })
  }
  callCancel(invitees, callID, config) {
    return ZIMEngine._callMethod('callCancel', {
      handle: this.handle.toString(),
      invitees,
      callID,
      config,
    })
  }
  callAccept(callID, config) {
    return ZIMEngine._callMethod('callAccept', {
      handle: this.handle.toString(),
      callID,
      config,
    })
  }
  callReject(callID, config) {
    return ZIMEngine._callMethod('callReject', {
      handle: this.handle.toString(),
      callID,
      config,
    })
  }
}
