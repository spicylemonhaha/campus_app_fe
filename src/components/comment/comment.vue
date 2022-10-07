<template>
  <view @click="change(event, comment)">
    <view style="margin-top: 20rpx; margin-bottom: 20rpx">{{ content }}</view>
    <view style="display: flex; height: 100rpx">
      <view style="font-size: 10rpx; color: lightgrey; flex: 10">
        <span>22小时前</span>
      </view>
      <view style="flex: 1; display: flex">
        <uni-icons
          :type="isOther ? 'hand-up' : 'more-filled'"
          size="30"
          @click="isOther ? add(event, comment) : null"
        ></uni-icons>
        <span v-show="isOther" style="width: 50rpx">{{ zans }}</span>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'comment',
  data() {
    return {}
  },
  props: {
    isOther: {
      type: Boolean,
      default: true,
    },
    content: {
      type: String,
      default: '',
    },
    zans: {
      type: Number,
      default: 0,
    },
    add: {
      type: Function,
    },
    comment: {
      type: Object,
    },
    change: {
      type: Function,
    },
  },
}
</script>

<style></style>
