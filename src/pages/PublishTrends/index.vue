<template>
  <view class="topBar"> 分享生活点滴~ </view>
  <view class="box">
    <view class="content">
      <view>
        <view class="textareaContainer">
          <textarea
            class="textarea"
            v-model="text"
            placeholder="分享生活,表达观点,提出困惑"
          ></textarea>
        </view>
        <view class="myTag" v-if="myTag !== ''">
          <i className="iconfont icon-huati"></i>{{ myTag }}
        </view>
        <uniFilePicker
          ref="imgUpload"
          v-model="imageValue"
          limit="9"
          class="uploadImg"
          fileMediatype="image"
          :auto-upload="false"
          :del-icon="true"
          @delete="deleteImg"
          @select="uploadImg"
          :image-styles="imageStyles"
        ></uniFilePicker>
        <view class="tagChoice" @click="open">
          <view class="leftText">
            <i className="iconfont icon-huati a"></i>参与话题
          </view>
          <view class="rightText"> # 选择话题 > </view>
        </view>
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
              v-for="(tag, index) in tagsData"
              :key="index"
              @click="clickTag(tag)"
              >{{ tag }}</view
            >
          </view>
        </scroll-view>
      </uni-popup>
      <button class="submitBut" form-type="submit" @click="submitTrend">
        发布
      </button>
    </view>
  </view>
</template>
<script setup lang="ts">
import uniFilePicker from '@dcloudio/uni-ui/lib/uni-file-picker/uni-file-picker.vue'
import { ref, reactive } from 'vue'
const imageStyles = {
  height: 200,
  width: 200,
  border: {
    color: '#cacaca',
    width: '1px',
    style: 'solid',
  },
}
let imageValue = reactive([])
const text = ref('')
const myTag = ref('')
const tagsData = reactive([
  '这是一个话题',
  'bbb',
  'ccc',
  'ddd',
  'aaa',
  'bbb',
  'ccc',
  'ddd',
  'aaa',
  'bbb',
  'ccc',
  'ddd',
])
const pop = ref(null)
const imgUpload = ref(null)
function deleteImg(e: any) {
  imageValue = imageValue.filter((x) => x !== e.tempFilePath)
}
function uploadImg(e: any) {
  imageValue.push(e.tempFilePaths[0])
}
function hasText() {
  if (text.value !== '') {
    return true
  } else {
    return false
  }
}
function hasImg() {
  if (imageValue.length !== 0) {
    return true
  } else {
    return false
  }
}
function hasTag() {
  if (myTag.value !== '') {
    return true
  } else {
    return false
  }
}
function submitTrend() {
  if (hasText()) {
    if (hasTag()) {
      uni.showModal({
        content: '请取消话题',
        showCancel: false,
      })
    } else {
      var output2 = { text: text.value, imgValue: imageValue[0] }
      console.log(output2)
      console.log('成功发布了', text.value, imageValue)
    }
  }
  if (!hasText()) {
    console.log(hasImg(), hasTag())
    if (hasImg() && hasTag()) {
      var output1 = { imgValue: imageValue[0], tag: myTag.value }
      console.log(output1)
      console.log('成功发布了', imageValue, myTag.value)
    }
    if (hasImg() && !hasTag()) {
      uni.showModal({
        content: '请选择话题',
        showCancel: false,
      })
    }
  }
  if (!hasText()) {
    if (!hasImg() && hasTag()) {
      uni.showModal({
        content: '请上传图片',
        showCancel: false,
      })
    }
    if (!hasImg() && !hasTag()) {
      uni.showModal({
        content: '请输入你想发布的内容',
        showCancel: false,
      })
    }
  }
}
function clickTag(tag: string) {
  if (myTag.value !== tag) {
    myTag.value = tag
  } else {
    myTag.value = ''
  }
  pop.value.close()
}
function open() {
  pop.value.open()
}
function close() {
  pop.value.close()
}
</script>
<style lang="scss">
page {
  background-color: #f3f4f8;
}
.a {
  color: rgb(26, 232, 204);
}
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
.topBar {
  font-size: 24rpx;
  color: #8f8f94;
  padding-left: 20rpx;
  background-color: rgb(206, 255, 249);
  height: 70rpx;
  line-height: 70rpx;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  .textarea {
    padding-top: 15rpx;
    padding-left: 15rpx;
    font-size: 32rpx;
    width: 750rpx;
    height: 300rpx;
  }
  .uploadImg {
    margin-left: 40rpx;
    width: 700rpx;
    margin-bottom: 40rpx;
  }
  .submitBut {
    color: white;
    margin-top: 60rpx;
    background-color: rgb(89, 208, 255);
    width: 500rpx;
    height: 72rpx;
    font-size: 32rpx;
    line-height: 72rpx;
    border-radius: 30rpx;
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
  .icon-huati {
    top: 5rpx;
    font-size: 36rpx;
    margin-right: 0;
    font-style: normal;
    vertical-align: -8%;
  }
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
