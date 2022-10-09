import {
  ZIMUserInfo,
  ZIMMessage,
  ZIMRoomInfo,
  ZIMGroupInfo,
  ZIMConversationType,
  ZIMConversationNotificationStatus,
  ZIMTokenRenewedResult,
  ZIMUsersInfoQueriedResult,
  ZIMUserNameUpdatedResult,
  ZIMUserExtendedDataUpdatedResult,
  ZIMRoomAdvancedConfig,
  ZIMRoomAttributesSetConfig,
  ZIMRoomAttributesDeleteConfig,
  ZIMRoomAttributesBatchOperationConfig,
  ZIMRoomMemberQueryConfig,
  ZIMRoomCreatedResult,
  ZIMRoomEnteredResult,
  ZIMRoomJoinedResult,
  ZIMRoomLeftResult,
  ZIMRoomAttributesBatchOperatedResult,
  ZIMRoomAttributesOperatedResult,
  ZIMRoomAttributesQueriedResult,
  ZIMRoomMemberQueriedResult,
  ZIMRoomOnlineMemberCountQueriedResult,
  ZIMGroupAdvancedConfig,
  ZIMGroupMemberQueryConfig,
  ZIMGroupCreatedResult,
  ZIMGroupJoinedResult,
  ZIMGroupLeftResult,
  ZIMGroupDismissedResult,
  ZIMGroupInfoQueriedResult,
  ZIMGroupListQueriedResult,
  ZIMGroupNameUpdatedResult,
  ZIMGroupNoticeUpdatedResult,
  ZIMGroupMemberKickedResult,
  ZIMGroupMemberListQueriedResult,
  ZIMGroupMemberNicknameUpdatedResult,
  ZIMGroupMemberRoleUpdatedResult,
  ZIMGroupMemberInfoQueriedResult,
  ZIMGroupAttributesOperatedResult,
  ZIMGroupAttributesQueriedResult,
  ZIMGroupUsersInvitedResult,
  ZIMGroupOwnerTransferredResult,
  ZIMGroupMemberCountQueriedResult,
  ZIMConversationQueryConfig,
  ZIMConversationDeleteConfig,
  ZIMConversationListQueriedResult,
  ZIMConversationDeletedResult,
  ZIMConversationNotificationStatusSetResult,
  ZIMConversationUnreadMessageCountClearedResult,
  ZIMMessageSendConfig,
  ZIMMessageDeleteConfig,
  ZIMMessageQueryConfig,
  ZIMMessageSentResult,
  ZIMMessageQueriedResult,
  ZIMMessageDeletedResult,
  ZIMCallInviteConfig,
  ZIMCallCancelConfig,
  ZIMCallAcceptConfig,
  ZIMCallRejectConfig,
  ZIMCallCancelSentResult,
  ZIMCallInvitationSentResult,
  ZIMCallAcceptanceSentResult,
  ZIMCallRejectionSentResult,
  ZIMMediaUploadingProgress,
  ZIMMediaDownloadingProgress,
  ZIMMediaMessage,
  ZIMMediaFileType,
  ZIMMediaDownloadedResult,
  ZIMUsersInfoQueryConfig,
  ZIMUserAvatarUrlUpdatedResult,
  ZIMGroupAvatarUrlUpdatedResult,
} from '../ZIMDefines'
import { ZIMEventHandler } from '../ZIMEventHandler'
export declare class ZIMEngine {
  handle: symbol
  appID: number
  appSign: string
  uploadingMap: Map<string, ZIMMediaUploadingProgress>
  downloadingMap: Map<string, ZIMMediaDownloadingProgress>
  eventNameList: string[]
  static _callMethod<T>(method: string, args?: {}): Promise<T>
  constructor(handle: symbol, appID: number, appSign: string)
  create(): Promise<void>
  destroy(): Promise<void>
  uploadLog(): Promise<void>
  on<K extends keyof ZIMEventHandler>(
    type: K,
    listener: ZIMEventHandler[K]
  ): void
  off<K extends keyof ZIMEventHandler>(type: K): void
  login(userInfo: ZIMUserInfo, token?: string): Promise<void>
  logout(): Promise<void>
  renewToken(token: string): Promise<ZIMTokenRenewedResult>
  updateUserName(userName: string): Promise<ZIMUserNameUpdatedResult>
  updateUserAvatarUrl(
    userAvatarUrl: string
  ): Promise<ZIMUserAvatarUrlUpdatedResult>
  updateUserExtendedData(
    extendedData: string
  ): Promise<ZIMUserExtendedDataUpdatedResult>
  queryUsersInfo(
    userIDs: string[],
    config: ZIMUsersInfoQueryConfig
  ): Promise<ZIMUsersInfoQueriedResult>
  queryConversationList(
    config: ZIMConversationQueryConfig
  ): Promise<ZIMConversationListQueriedResult>
  deleteConversation(
    conversationID: string,
    conversationType: ZIMConversationType,
    config: ZIMConversationDeleteConfig
  ): Promise<ZIMConversationDeletedResult>
  setConversationNotificationStatus(
    status: ZIMConversationNotificationStatus,
    conversationID: string,
    conversationType: ZIMConversationType
  ): Promise<ZIMConversationNotificationStatusSetResult>
  clearConversationUnreadMessageCount(
    conversationID: string,
    conversationType: ZIMConversationType
  ): Promise<ZIMConversationUnreadMessageCountClearedResult>
  sendMessage(
    message: ZIMMessage,
    conversationID: string,
    conversationType: ZIMConversationType,
    config: ZIMMessageSendConfig
  ): Promise<ZIMMessageSentResult>
  sendMediaMessage(
    message: ZIMMediaMessage,
    toConversationID: string,
    conversationType: ZIMConversationType,
    config: ZIMMessageSendConfig,
    progress: ZIMMediaUploadingProgress
  ): Promise<ZIMMessageSentResult>
  deleteMessages(
    messageList: ZIMMessage[],
    conversationID: string,
    conversationType: ZIMConversationType,
    config: ZIMMessageDeleteConfig
  ): Promise<ZIMMessageDeletedResult>
  deleteAllMessage(
    conversationID: string,
    conversationType: ZIMConversationType,
    config: ZIMMessageDeleteConfig
  ): Promise<ZIMMessageDeletedResult>
  queryHistoryMessage(
    conversationID: string,
    conversationType: ZIMConversationType,
    config: ZIMMessageQueryConfig
  ): Promise<ZIMMessageQueriedResult>
  downloadMediaFile(
    message: ZIMMediaMessage,
    fileType: ZIMMediaFileType,
    progress: ZIMMediaDownloadingProgress
  ): Promise<ZIMMediaDownloadedResult>
  createRoom(
    roomInfo: ZIMRoomInfo,
    config?: ZIMRoomAdvancedConfig
  ): Promise<ZIMRoomCreatedResult>
  enterRoom(
    roomInfo: ZIMRoomInfo,
    config?: ZIMRoomAdvancedConfig
  ): Promise<ZIMRoomEnteredResult>
  joinRoom(roomID: string): Promise<ZIMRoomJoinedResult>
  leaveRoom(roomID: string): Promise<ZIMRoomLeftResult>
  queryRoomMemberList(
    roomID: string,
    config: ZIMRoomMemberQueryConfig
  ): Promise<ZIMRoomMemberQueriedResult>
  queryRoomOnlineMemberCount(
    roomID: string
  ): Promise<ZIMRoomOnlineMemberCountQueriedResult>
  queryRoomAllAttributes(
    roomID: string
  ): Promise<ZIMRoomAttributesQueriedResult>
  setRoomAttributes(
    roomAttributes: Record<string, string>,
    roomID: string,
    config: ZIMRoomAttributesSetConfig
  ): Promise<ZIMRoomAttributesOperatedResult>
  deleteRoomAttributes(
    keys: string[],
    roomID: string,
    config: ZIMRoomAttributesDeleteConfig
  ): Promise<ZIMRoomAttributesOperatedResult>
  beginRoomAttributesBatchOperation(
    roomID: string,
    config: ZIMRoomAttributesBatchOperationConfig
  ): Promise<void>
  endRoomAttributesBatchOperation(
    roomID: string
  ): Promise<ZIMRoomAttributesBatchOperatedResult>
  createGroup(
    groupInfo: ZIMGroupInfo,
    userIDs: string[],
    config?: ZIMGroupAdvancedConfig
  ): Promise<ZIMGroupCreatedResult>
  joinGroup(groupID: string): Promise<ZIMGroupJoinedResult>
  leaveGroup(groupID: string): Promise<ZIMGroupLeftResult>
  dismissGroup(groupID: string): Promise<ZIMGroupDismissedResult>
  queryGroupList(): Promise<ZIMGroupListQueriedResult>
  updateGroupNotice(
    groupNotice: string,
    groupID: string
  ): Promise<ZIMGroupNoticeUpdatedResult>
  updateGroupName(
    groupName: string,
    groupID: string
  ): Promise<ZIMGroupNameUpdatedResult>
  updateGroupAvatarUrl(
    groupAvatarUrl: string,
    groupID: string
  ): Promise<ZIMGroupAvatarUrlUpdatedResult>
  queryGroupInfo(groupID: string): Promise<ZIMGroupInfoQueriedResult>
  setGroupAttributes(
    groupAttributes: Record<string, string>,
    groupID: string
  ): Promise<ZIMGroupAttributesOperatedResult>
  deleteGroupAttributes(
    keys: string[],
    groupID: string
  ): Promise<ZIMGroupAttributesOperatedResult>
  queryGroupAttributes(
    keys: string[],
    groupID: string
  ): Promise<ZIMGroupAttributesQueriedResult>
  queryGroupAllAttributes(
    groupID: string
  ): Promise<ZIMGroupAttributesQueriedResult>
  setGroupMemberNickname(
    nickname: string,
    forUserID: string,
    groupID: string
  ): Promise<ZIMGroupMemberNicknameUpdatedResult>
  setGroupMemberRole(
    role: number,
    forUserID: string,
    groupID: string
  ): Promise<ZIMGroupMemberRoleUpdatedResult>
  transferGroupOwner(
    toUserID: string,
    groupID: string
  ): Promise<ZIMGroupOwnerTransferredResult>
  queryGroupMemberInfo(
    userID: string,
    groupID: string
  ): Promise<ZIMGroupMemberInfoQueriedResult>
  inviteUsersIntoGroup(
    userIDs: string[],
    groupID: string
  ): Promise<ZIMGroupUsersInvitedResult>
  kickGroupMembers(
    userIDs: string[],
    groupID: string
  ): Promise<ZIMGroupMemberKickedResult>
  queryGroupMemberList(
    groupID: string,
    config: ZIMGroupMemberQueryConfig
  ): Promise<ZIMGroupMemberListQueriedResult>
  queryGroupMemberCount(
    groupID: string
  ): Promise<ZIMGroupMemberCountQueriedResult>
  callInvite(
    invitees: string[],
    config: ZIMCallInviteConfig
  ): Promise<ZIMCallInvitationSentResult>
  callCancel(
    invitees: string[],
    callID: string,
    config: ZIMCallCancelConfig
  ): Promise<ZIMCallCancelSentResult>
  callAccept(
    callID: string,
    config: ZIMCallAcceptConfig
  ): Promise<ZIMCallAcceptanceSentResult>
  callReject(
    callID: string,
    config: ZIMCallRejectConfig
  ): Promise<ZIMCallRejectionSentResult>
}
