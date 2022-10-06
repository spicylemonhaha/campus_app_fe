<template>
  <view v-for="item in cardDataArr" :key="item.title">
    <view class="introduceWrap" v-if="item.content!=''">
      <view class="introduceHead">
        <view class="icon"></view>
        <view class="aboutMe">{{ item.title }}</view>
      </view>
      <view class="introduceMyself">
        {{ item.content }}
      </view>
      <view class="lableWrap">
        <template v-for="(card, index) in item.cards" :key="index">
          <view class="lable"> {{ card }} </view>
        </template>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
interface cardProps {
  cardDataArr: cardObj[]
}
interface cardObj {
  title: string
  content: string
  cards: string[]
}
const props = withDefaults(defineProps<cardProps>(), {})
</script>

<style scoped>
.introduceWrap {
  padding: 15rpx;
  margin: 25rpx;
  border-radius: 10px;
  background-color: white;
}

.introduceWrap .introduceHead {
  height: 70rpx;
  width: 100%;
  position: relative;
}

.introduceWrap .introduceHead .icon {
  position: absolute;
  border-radius: 20rpx;
  left: 20rpx;
  top: 18rpx;
  width: 15rpx;
  height: 30rpx;
  background-color: rgb(89,208,255);
}

.introduceWrap .introduceHead .aboutMe {
  position: absolute;
  top: 15.5rpx;
  left: 45rpx;
  font-size: 26rpx;
}

.introduceWrap .introduceMyself {
  padding: 15rpx;
  font-size: 26rpx;
  border-bottom: 1px solid #ccc;
}
.lableWrap {
  display: flex;
  flex-wrap: wrap;
}

.lableWrap .lable {
  margin-top: 20rpx;
  margin-right: 20rpx;
  padding: 0 20rpx;
  height: 40rpx;
  line-height: 40rpx;
  font-size: 24rpx;
  text-align: center;
  border-radius: 10rpx;
  background-color: rgb(216, 244, 255);
  color: rgb(15, 172, 235);
  font-weight: 600;
}
</style>
