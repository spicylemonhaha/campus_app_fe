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
import { publishTrends } from '../../api/'
import { getTagsReq } from '../../api/'
const imageStyles = {
  height: 200,
  width: 200,
  border: {
    color: '#cacaca',
    width: '1px',
    style: 'solid',
  },
}
let imageValue = reactive<Array<string>>([])
const text = ref<string>('')
const myTag = ref<string>('')
// const pop = ref(null)
const imgUpload = ref(null)
function deleteImg(e: any) {
  imageValue = imageValue.filter((x) => x !== e.tempFile.name)
}
function uploadImg(e: any) {
  imageValue.push(e.tempFiles[0].name)
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
const getTagsAPI = async () => {
  const res = await getTagsReq()
  let allTagsList = res.data.topicList.recentTopic.concat(
    res.data.topicList.historyTopic
  )
  return allTagsList
}
const tags = reactive([])
getTagsAPI().then((value) => {
  value.forEach((item: string) => {
    tags.push(item)
  })
})

const submitTrendAPI = async (data: string[]) => {
  const res = await publishTrends(data)
  console.log(res)
}
var submitTrend = function submitTrend() {
  if (hasText()) {
    if (hasTag()) {
      uni.showModal({
        content: '使用话题功能时仅能发布图片',
        showCancel: false,
      })
    } else {
      if (hasImg()) {
        let imgString = imageValue.join('&')
        var output2 = {
          userId: '111',
          contentText: text.value,
          contentPicture: imgString,
          tag: '',
        }
        submitTrendAPI(output2)
        console.log(output2)
      } else {
        var output3 = {
          userId: '111',
          contentText: text.value,
          contentPicture: '',
          tag: '',
        }
        submitTrendAPI(output3)
        console.log(output3)
      }
    }
  }
  if (!hasText()) {
    console.log(hasImg(), hasTag())
    if (hasImg() && hasTag()) {
      let imgString = imageValue.join('&')
      var output1 = {
        userId: '111',
        contentText: '',
        contentPicture: imgString,
        tag: myTag.value,
      }
      submitTrendAPI(output1)
      console.log(output1)
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
