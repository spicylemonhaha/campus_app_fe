<template>
  <view v-for="item in cardDataArr" :key="item.title">
    <view class="introduceWrap">
      <view class="introduceHead">
        <view class="icon"></view>
        <view class="aboutMe">{{ item.title }}</view>
        <navigator url="../personalEdit/index" class="edit">编辑</navigator>
      </view>
      <view
        v-if="item.content == ''"
        class="introduceMyself"
        style="font-size: 26rpx; color: rgb(177, 175, 175)"
      >
        讲讲你的经历和性格吧~111
      </view>
      <view v-else class="introduceMyself">
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
  background-color: rgb(89, 208, 255);
}

.introduceWrap .introduceHead .aboutMe {
  position: absolute;
  top: 15.5rpx;
  left: 45rpx;
  font-size: 26rpx;
}

.introduceWrap .introduceHead .edit {
  position: absolute;
  text-align: center;
  border-radius: 20px;
  top: 8rpx;
  left: 550rpx;
  width: 100rpx;
  height: 45rpx;
  line-height: 45rpx;
  font-weight: 600;
  font-size: 24rpx;
  background-color: #f3f4f8;
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
