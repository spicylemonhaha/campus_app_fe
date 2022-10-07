<template>
  <view class="tagChoice" @click="open">
    <view class="leftText">
      <i className="iconfont icon-huati a"></i>参与话题
    </view>
    <view class="rightText"> # 选择话题 > </view>
  </view>
  <uni-popup ref="pop" type="bottom">
    <scroll-view class="popContent" scroll-y="true" show-scrollbar="false">
      <view class="popTitle">
        选择参与话题
        <i className="iconfont icon-guanbi b" @click="close"></i>
      </view>
      <view class="popTags">
        <view
          class="popTag"
          v-for="(tag, index) in props.tags"
          :key="index"
          @click="clickTag(tag)"
          >{{ tag }}</view
        >
      </view>
    </scroll-view>
  </uni-popup>
</template>

<script setup>
import { ref, reactive } from 'vue'
const props = defineProps({
  tags: Array,
})
const emits = defineEmits(['changeTag'])
const pop = ref(null)
function clickTag(tag) {
  emits('changeTag', tag)
  pop.value.close()
}
function open() {
  pop.value.open()
}
function close() {
  pop.value.close()
}
</script>

<style scoped lang="scss">
.b {
  font-style: normal;
  color: #717171;
  font-size: 24rpx;
  position: absolute;
  right: 30rpx;
  top: 20rpx;
  width: 60rpx;
  height: 35rpx;
}
.tagChoice {
  display: flex;
  width: 700rpx;
  margin: 0 auto;
  color: #464646;
  height: 64rpx;
  font-size: 24rpx;
  border-radius: 30rpx;
  line-height: 64rpx;
  background-color: #f3f4f8;
  justify-content: space-between;
  .leftText,
  .rightText {
    padding-left: 20rpx;
    padding-right: 20rpx;
    font-weight: 600;
  }
}
.icon-huati {
  top: 5rpx;
  font-size: 36rpx;
  margin-right: 0;
  font-style: normal;
  vertical-align: -8%;
}
.myTag {
  display: inline-block;
  background-color: rgb(211, 255, 255);
  padding: 15rpx 30rpx;
  background-color: #ceffff;
  color: #009e8c;
  font-size: 28rpx;
  font-weight: 600;
  margin: 0rpx 30rpx 10rpx 30rpx;
  border-radius: 35rpx;
  line-height: 0.8;
}

.popContent {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 750rpx;
  height: 450rpx;
  border-radius: 42rpx 42rpx 0 0;
  align-items: center;
  position: relative;
  .popTitle {
    font-size: 24rpx;
    color: #8f8f94;
    margin: 15rpx;
    text-align: center;
  }
  .popTags {
    margin-top: 30rpx;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    .popTag {
      display: inline-block;
      width: 280rpx;
      height: 70rpx;
      line-height: 70rpx;
      background-color: #ceffff;
      text-align: center;
      color: #009e8c;
      font-size: 28rpx;
      margin: 0rpx 30rpx 15rpx 30rpx;
      border-radius: 35rpx;
      font-weight: 600;
    }
  }
}
</style>
