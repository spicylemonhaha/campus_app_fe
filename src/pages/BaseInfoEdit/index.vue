<template>
  <uni-section title="头像" type="line" class="">
    <view class="example-body">
      <uni-file-picker
        limit="1"
        :del-icon="false"
        disable-preview
        file-mediatype="image"
        :image-styles="imageStyles"
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
        <uni-forms-item label="昵称" required name="name">
          <uni-easyinput
            v-model="customFormData.name"
            placeholder="请输入姓名"
          />
        </uni-forms-item>
        <uni-forms-item label="个性签名" required name="name">
          <uni-easyinput
            v-model="customFormData.name"
            placeholder="请输入姓名"
          />
        </uni-forms-item>
        <uni-forms
          ref="customForm"
          :rules="customRules"
          :modelValue="customFormData"
        >
          <uni-forms-item label="性别" required>
            <uni-data-checkbox
              v-model="customFormData.sex"
              :localdata="sexs"
              class="sexCSS"
            />
          </uni-forms-item>
        </uni-forms>
        <uni-forms-item label="年龄" required name="age">
          <uni-easyinput
            v-model="customFormData.age"
            placeholder="请输入年龄"
          />
        </uni-forms-item>
        <uni-forms-item label="身高" required name="age">
          <uni-easyinput
            v-model="customFormData.age"
            placeholder="请输入年龄"
          />
        </uni-forms-item>
        <uni-forms-item label="星座" required name="age">
          <uni-easyinput
            v-model="customFormData.age"
            placeholder="请输入年龄"
          />
        </uni-forms-item>
        <uni-forms-item label="家乡" required name="age">
          <uni-easyinput
            v-model="customFormData.age"
            placeholder="请输入年龄"
          />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit('customForm')">提交</button>
    </view>
  </uni-section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const customFormData = reactive({
  name: '',
  age: '',
  introduction: '',
  sex: 2,
  hobby: [5],
  datetimesingle: 1627529992399,
})
// 表单数据
const alignmentFormData = reactive({
  name: '',
  age: '',
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
  name: {
    rules: [
      {
        required: true,
        errorMessage: '姓名不能为空',
      },
    ],
  },
  age: {
    rules: [
      {
        required: true,
        errorMessage: '年龄不能为空',
      },
    ],
  },
})
const imageStyles = reactive({
  width: 100,
  height: 100,
})
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
