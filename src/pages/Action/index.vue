<template>
  <view class="container">
    <uni-nav-bar
      shadow
      fixed
      left-icon="left"
      @clickLeft="back"
      title="Create a 1v1 chat"
    ></uni-nav-bar>
    <view class="form-content">
      <uni-forms
        ref="form"
        label-width="60"
        :modelValue="formData"
        :rules="rules"
      >
        <uni-forms-item label="User ID" name="account">
          <uni-easyinput
            type="text"
            v-model="formData.account"
            placeholder="Required"
          />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit">Submit</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const form = ref<any>(null)
const formData = ref({
  account: '',
})
const rules = ref({
  account: {
    rules: [
      {
        required: true,
        errorMessage: ' ',
      },
      {
        minLength: 1,
        maxLength: 15,
        errorMessage: 'minLength: {minLength}, maxLength: {maxLength}',
      },
    ],
  },
})

const back = () => {
  uni.navigateBack()
}
const submit = () => {
  const convInfo = {
    id: formData.value.account,
    type: 0,
    name: formData.value.account,
  }
  const paramsString =
    '?' +
    Object.keys(convInfo)
      .map((key) => `${key}=${convInfo[key]}`)
      .join('&')
  form.value
    .validate()
    .then((res: any) => {
      uni.navigateTo({
        url: '../chat/chat' + paramsString,
      })
    })
    .catch((err: any) => {
      console.log('error:', err)
    })
}
</script>

<style lang="scss">
.container {
  height: 100vh;
  background-color: #fff;

  .form-content {
    padding: 120px 20px 0;
    background-color: #fff;
  }
}
</style>
