<template>
  <view class="title"> 学历信息认证 </view>
  <view class="box">
    <view class="content">
      <view class="header">
        <view>
          <form @submit="formSubmit">
            <view class="com-input">
              <view class="item-name">真实姓名</view>
              <input
                class="input"
                name="name"
                placeholder="仅用于身份审核"
                maxlength="12"
              />
            </view>
            <view class="com-input">
              <view class="item-name">学校</view>
              <input
                class="input"
                name="school"
                placeholder="请输入学校"
                maxlength="12"
              />
            </view>
            <view class="com-input">
              <view class="item-name">专业</view>
              <input
                class="input"
                name="major"
                placeholder="请输入专业"
                maxlength="12"
              />
            </view>
            <view class="com-input">
              <view class="item-name">学号</view>
              <input
                class="input"
                name="stuId"
                placeholder="请输入学号"
                maxlength="12"
              />
            </view>
            <view class="uploadImgContainer">
              上传学生证
              <uni-file-picker
                class="uploadImg"
                limit="1"
                fileMediatype="image"
                @select="select"
                @delete="deleteImg"
                :del-icon="true"
                :image-styles="imageStyles"
              ></uni-file-picker>
            </view>
            <button class="submitBut" form-type="submit">提交</button>
          </form>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import uniFilePicker from '@dcloudio/uni-ui/lib/uni-file-picker/uni-file-picker.vue'
interface Output {
  name: string
  school: string
  major: string
  stuId: string
  imgData: any
}
const imageStyles = {
  height: 300,
  width: 600,
  border: {
    color: '#cacaca',
    width: '3px',
    style: 'dashed',
  },
}

function formCheck(
  name: string,
  school: string,
  major: string,
  stuId: string
): boolean {
  if (
    name.trim() !== '' &&
    school.trim() !== '' &&
    major.trim() !== '' &&
    stuId.trim() !== ''
  ) {
    return true
  }
  return false
}
var imgName = ''
var uploadSuccess = false
const select = (e: any) => {
  imgName = e.tempFiles[0].name
  uploadSuccess = true
}
const deleteImg = (e: any) => {
  imgName = ''
  uploadSuccess = false
}
const formSubmit = (e: any) => {
  // console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
  const { name, school, major, stuId } = e.detail.value
  const formSuccess: boolean = formCheck(name, school, major, stuId)
  var formdata = e.detail.value
  if (formSuccess && uploadSuccess) {
    // 信息已输入且图片已上传,输出
    const output: Output = {
      name: formdata.name,
      school: formdata.school,
      major: formdata.major,
      stuId: formdata.stuId,
      imgData: imgName,
    }
    console.log(output)
  } else {
    uni.showModal({
      content: '请填写正确信息',
      showCancel: false,
    })
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f4f8;
}
.box {
  padding: 0 40rpx;
}
.title {
  font-size: 36rpx;
  font-weight: 400;
  color: #3a3a3c;
  text-align: center;
  background-image: linear-gradient(to right, rgb(89, 208, 255), #93ffbe);
  height: 125rpx;
  line-height: 125rpx;
  box-shadow: #4a4a4a 0rpx 0 10rpx 1rpx;
}
.content {
  display: flex;
  flex-direction: column;
  color: #4a4a4a;
  .com-input {
    font-size: 28rpx;
    height: 100rpx;
    padding-left: 50rpx;
    line-height: 100rpx;
    border-bottom: 0.5rpx #8f8f94 solid;
    position: relative;
    .item-name {
      display: inline-block;
      width: 200rpx;
      font-size: 30rpx;
      font-weight: 500;
    }
    .input {
      font-size: 28rpx;
      display: inline-block;
      position: absolute;
      top: 28rpx;
    }
  }
  .uploadImgContainer {
    padding-top: 15rpx;
    padding-left: 30rpx;
    font-size: 30rpx;
    .uploadImg {
      margin-left: 0;
      margin-right: 0;
      margin-top: 20rpx;
      margin-bottom: 20rpx;
    }
  }
  .submitBut {
    background-color: rgb(89, 208, 255);
    width: 500rpx;
    height: 80rpx;
    line-height: 80rpx;
    color: #ffffff;
    font-weight: 500;
    font-size: 32rpx;
    // box-shadow: #4a4a4a 0 0 10rpx 1rpx;
    border-radius: 40rpx;
  }
}
</style>
