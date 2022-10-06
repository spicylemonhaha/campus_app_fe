<template>
  <view class="container">
    <uni-title type="h1" align="center" title="zego IM"></uni-title>
    <uni-forms ref="form" :modelValue="loginForm" :rules="rules">
      <uni-forms-item label="User ID" name="userID">
        <uni-easyinput
          type="text"
          v-model="loginForm.userID"
          placeholder="Required"
        />
      </uni-forms-item>
      <uni-forms-item label="User name" name="userName">
        <uni-easyinput
          type="text"
          v-model="loginForm.userName"
          placeholder="Required"
        />
      </uni-forms-item>
    </uni-forms>
    <button type="primary" @click="login">Login</button>
  </view>
</template>

<script setup>
import uniFormsItem from '@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue'
import uniForms from '@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue'
import uniEasyinput from '@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue'
import uniTitle from '@dcloudio/uni-ui/lib/uni-title/uni-title.vue'
import { generateToken } from '../../assets/config'
import useStore from '../../store/index'
import { ref } from 'vue'
const store = useStore()
const form = ref(null)
const loginForm = ref({
  userID: '',
  userName: Date.now() + '',
})
const rules = ref({
  userName: {
    rules: [
      {
        required: true,
        errorMessage: ' ',
      },
      {
        minLength: 1,
        maxLength: 32,
        errorMessage: 'minLength: {minLength}, maxLength: {maxLength}',
      },
    ],
  },
  userID: {
    rules: [
      {
        required: true,
        errorMessage: ' ',
      },
      {
        minLength: 1,
        maxLength: 32,
        errorMessage: 'minLength: {minLength}, maxLength: {maxLength}',
      },
    ],
  },
})
console.log(store)
const setUserInfoToStorage = (info, token) => {
  try {
    uni.setStorageSync('userInfo', JSON.stringify(info))
    uni.setStorageSync('token', token)
  } catch (e) {
    // TODO
    console.log('setUserInfoToStorage', e)
  }
}
const login = () => {
  const userID = loginForm.value.userID
  form.value
    .validate()
    .then((res) => {
      const token = generateToken(userID)
      store
        .login(loginForm.value, token)
        .then((res) => {
          console.log('login res', res)
          // setUserInfoToStorage(loginForm, token);
          store.isLogin = true
          store.state.user = loginForm
          setUserInfoToStorage(loginForm.value, token)
          uni.navigateTo({
            url: '../MemberList/index',
          })
        })
        .catch((err) => {
          store.isLogin = false
          console.log('login err', err)
          // errorHandle(err);
        })
    })
    .catch((err) => {
      console.log('error:', err)
    })
}
</script>

<style lang="scss">
.container {
  padding: 120px 20px 20px;
  // font-size: 14px;

  .title {
    font-size: 28px;
    text-align: center;
    padding: 12px 0;
  }
}
</style>
