<template>
  <view class="detail">
    <image src="../../static/logo.png" class="image-one"></image>
    <view class="information">
      <view style="flex: 2; margin-left: 10rpx">{{ userName }}</view>
      <view class="in">
        <span v-for="(info, index) in userInfo" :key="index">{{ info }}·</span>
      </view>
    </view>
    <view v-show="isBtn" class="btn">
      <uni-tag
        text="关注"
        type="primary"
        circle="true"
        size="default"
      ></uni-tag>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'detail',
  data() {
    return {}
  },
  props: {
    isBtn: {
      type: Boolean,
      default: true,
    },
    userName: {
      type: String,
      default: '',
    },
    userInfo: {
      type: Array,
    },
  },
}
</script>

<style>
.detail {
  display: flex;
  flex-direction: row;
  height: 80rpx;
  border-bottom: 1rpx solid lightgrey;
}
.image-one {
  flex-basis: 80rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 40px;
}
.btn {
  text-align: center;
  line-height: 80rpx;
  flex: 1;
}
.in {
  flex: 1;
  margin-left: 10rpx;
  font-size: 8rpx;
  color: gray;
}
.information {
  display: flex;
  flex-direction: column;
  flex: 5;
}
</style>
