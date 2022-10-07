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
        <TagChoice :tags="tags" @changeTag="clickTag"></TagChoice>
        <button class="submitBut" form-type="submit" @click="submitTrend">
          发布
        </button>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import uniFilePicker from '@dcloudio/uni-ui/lib/uni-file-picker/uni-file-picker.vue'
import { ref, reactive } from 'vue'
import TagChoice from './components/TagChoice.vue'
const imageStyles = {
  height: 200,
  width: 200,
  border: {
    color: '#cacaca',
    width: '1px',
    style: 'solid',
  },g'i't
}
let imageValue = reactive([])
const text = ref('')
const myTag = ref('')
const tags = reactive(['这是一个话题', 'bbb'])
// const pop = ref(null)
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
var submitTrend = function submitTrend() {
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

function clickTag(tag: any) {
  if (myTag.value !== tag) {
    myTag.value = tag
  } else {
    myTag.value = ''
  }
}
</script>
<style lang="scss">
page {
  background-color: #f3f4f8;
}
.a {
  color: rgb(26, 232, 204);
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
</style>
