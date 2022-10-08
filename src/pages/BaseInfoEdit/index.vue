<template>
  <uni-section title="头像" type="line" class="">
    <view class="example-body">
      <uni-file-picker
        limit="1"
        :del-icon="false"
        disable-preview
        file-mediatype="image"
        :image-styles="imageStyles"
        @select="select"
        >上传头像</uni-file-picker
      >
    </view>
  </uni-section>
  <uni-section title="基本信息" type="line">
    <view class="example">
      <!-- 自定义表单校验 -->
      <uni-forms
        ref="customForm"
        :rules="customRules"
        :modelValue="customFormData"
        label-position="top"
      >
        <uni-forms-item label="昵称" required name="userName">
          <uni-easyinput
            v-model="customFormData.userName"
            placeholder="请输入您的昵称"
          />
        </uni-forms-item>
        <uni-forms-item label="个性签名" required name="personalSign">
          <uni-easyinput
            v-model="customFormData.personalSign"
            placeholder="请输入您的个性签名"
          />
        </uni-forms-item>
        <uni-forms-item label="性别" required name="sex">
          <uni-data-checkbox
            v-model="customFormData.sex"
            :localdata="sexs"
            class="sexCSS"
          />
        </uni-forms-item>
        <uni-forms-item label="年龄" required name="age">
          <uni-easyinput
            v-model="customFormData.age"
            placeholder="请输入您的年龄"
          />
        </uni-forms-item>
        <uni-forms-item label="身高" required name="height">
          <uni-easyinput
            v-model="customFormData.height"
            placeholder="请输入您的身高"
          />
        </uni-forms-item>
        <uni-forms-item label="星座" required name="constellation">
          <uni-easyinput
            v-model="customFormData.constellation"
            placeholder="请输入您的星座"
          />
        </uni-forms-item>
        <uni-forms-item label="学校" required name="school">
          <uni-easyinput
            v-model="customFormData.school"
            placeholder="请输入您的学校"
          />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit()">提交</button>
    </view>
  </uni-section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const customForm: any = ref(null)
const sexForm: any = ref(null)
const customFormData = reactive({
  userId: '1',
  avatar: '',
  userName: '',
  personalSign: '',
  sex: '',
  age: '',
  height: '',
  constellation: '',
  school: '',
})
const sexs = reactive([
  {
    text: '男',
    value: 0,
  },
  {
    text: '女',
    value: 1,
  },
])
const customRules = reactive({
  userName: {
    rules: [
      {
        required: true,
        errorMessage: '姓名不能为空',
      },
    ],
  },
  school: {
    rules: [
      {
        required: true,
        errorMessage: '学校不能为空',
      },
    ],
  },
  personalSign: {
    rules: [
      {
        required: true,
        errorMessage: '个性签名不能为空',
      },
    ],
  },
  constellation: {
    rules: [
      {
        required: true,
        errorMessage: '星座不能为空',
      },
    ],
  },
  age: {
    rules: [
      {
        required: true,
        errorMessage: '年龄不能为空',
      },
      {
        format: 'number',
        errorMessage: '年龄只能输入数字',
      },
    ],
  },
  height: {
    rules: [
      {
        required: true,
        errorMessage: '身高不能为空',
      },
      {
        format: 'number',
        errorMessage: '身高只能输入数字',
      },
    ],
  },
  sex: {
    rules: [
      {
        required: true,
        errorMessage: '性别为必填项',
      },
    ],
  },
})
const imageStyles = reactive({
  width: 100,
  height: 100,
})
const submit = () => {
  customForm.value
    .validate()
    .then((res: any) => {
      console.log('success', res)
      uni.showToast({
        title: `校验通过`,
      })
    })
    .catch((err: any) => {
      console.log('err', err)
    })
}
const select = (e) => {
  console.log('上传成功', e)
}
</script>

<style>
page {
  background-color: #f3f4f8;
}
.example-body {
  padding: 10px;
  padding-top: 0;
}

.example {
  padding: 0 15rpx;
}
.sexCSS {
  position: relative;
  top: 14rpx;
}
</style>
