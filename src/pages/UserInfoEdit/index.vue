<template>
  <view class="detailWrap">
    <uni-section title="个人形象展示" type="line">
      <view class="example-body">
        <uni-file-picker limit="5" title="最多选择5张图片"></uni-file-picker>
      </view>
    </uni-section>
    <view class="basicInfo">
      <view class="icon"></view>
      <view class="basic1"> 基本资料</view>
      <navigator url="../BaseInfoEdit/index" class="edit">编辑</navigator>
    </view>
    <view class="nameWrap">
      <view class="example-body profileHead">
        <uni-file-picker
          disable-preview
          :del-icon="false"
          :limit="1"
          :imageStyles="imageStyles"
          file-mediatype="image"
        >
        </uni-file-picker>
      </view>
      <view class="name"
        >不负韶华 <text class="iconfont icon-xingbie-nan"></text
      ></view>
      <view class="position iconfont icon-weizhi"> 家里蹲大学</view>
    </view>
    <view class="ageWrap">
      <view class="age">20岁</view>
      <view class="height">177cm</view>
      <view class="star">双子座</view>
    </view>
  </view>
  <Card :cardDataArr="cardDataArr"></Card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Card from './components/Card.vue'
const imageStyles = reactive({
  width: 64,
  height: 64,
  border: {
    radius: '50%',
  },
})
const cardDataArr = reactive([
  {
    title: '关于我',
    content: '喜欢打王者',
    cards: ['努力学习', '学好前端', '加油'],
  },
  {
    title: '兴趣爱好',
    content: '喜欢打王者',
    cards: ['努力学习', '学好前端', '加油'],
  },
  {
    title: '感情观',
    content: '喜欢打王者',
    cards: ['努力学习', '学好前端', '加油'],
  },
  {
    title: '心仪的Ta',
    content: '喜欢打王者',
    cards: ['努力学习', '学好前端', '加油'],
  },
])
</script>

<style scoped>
page {
  background-color: #f3f4f8;
}

.example-body {
  padding: 10px;
  padding-top: 0;
}

.baseInfoWrap {
  background-color: white;
  margin: 0 15rpx 15rpx 15rpx;
}

.uni-margin-wrap {
  width: 690rpx;
  width: 100%;
}

.swiper {
  height: 450rpx;
}

.swiper-item {
  border-radius: 20rpx;
  display: block;
  height: 450rpx;
  line-height: 450rpx;
  text-align: center;
}

.baseInfo {
  margin: 0rpx 15rpx 15rpx 15rpx;
  padding: 10rpx;
}

.username {
  font-size: 36rpx;
  font-weight: 600;
}

.infoWrap {
  display: flex;
}

/* 小程序 */
.detailWrap {
  padding: 15rpx;
  margin: 25rpx;
  border-radius: 10px;
  background-color: white;
}

.detailWrap .basicInfo {
  height: 70rpx;
  width: 100%;
  position: relative;
}

.detailWrap .basicInfo .icon {
  position: absolute;
  border-radius: 20rpx;
  left: 20rpx;
  top: 18rpx;
  width: 15rpx;
  height: 30rpx;
  background-color: rgb(89, 208, 255);
}

.detailWrap .basicInfo .basic1 {
  position: absolute;
  top: 13.5rpx;
  left: 45rpx;
  font-size: 26rpx;
}

.detailWrap .basicInfo .edit {
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

.detailWrap .nameWrap {
  height: 70rpx;
  width: 100%;
  display: flex;
  position: relative;
}

.profileHead {
  top: -12rpx;
  left: 0;
}

.detailWrap .nameWrap .name {
  font-weight: 600;
  padding-left: 15rpx;
  padding-top: 32rpx;
}

.detailWrap .nameWrap .name text {
  color: #2a9eeb;
}

.detailWrap .nameWrap .position {
  position: absolute;
  font-size: 24rpx;
  right: 20rpx;
  top: 38rpx;
}

.detailWrap .ageWrap {
  height: 50rpx;
  width: 100%;
  display: flex;
  position: relative;
  margin-top: 50rpx;
  margin-left: 5rpx;
}

.detailWrap .ageWrap .age {
  position: absolute;
  font-size: 24rpx;
  left: 13rpx;
  color: black;
}

.detailWrap .ageWrap .height {
  position: absolute;
  font-size: 24rpx;
  left: 100rpx;
  color: black;
}

.detailWrap .ageWrap .star {
  position: absolute;
  font-size: 24rpx;
  left: 220rpx;
  color: black;
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
  background-color: #3cf53c;
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
</style>
