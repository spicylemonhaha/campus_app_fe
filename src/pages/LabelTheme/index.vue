<template>
  <view class="label">
    <view class="desc">
      <view class="iconfont icon-huati"></view>
      <view class="title">
        <text>{{ title }}</text>
      </view>
      <view class="detail">
        <text>{{ desInfo }}</text>
      </view>
      <view class="number">
        <text
          >{{ join }}W人参与&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{{
            content
          }}个内容</text
        >
      </view>
    </view>
    <dynamic class="dynamic"></dynamic>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dynamic from './components/Dynamic.vue'
import { getDynamicList } from '../../api'
import { onShow } from '@dcloudio/uni-app'
onShow(() => {
  getDynamicList({
    tag: '校园无语瞬间',
    dynamicType: '热门',
  }).then((res) => {
    console.log(res)
  })
})
const title = ref('#校园无语瞬间')
const desInfo = ref(
  '脱单的小伙伴们，把狗粮狠狠地撒在这里吧~脱单的小伙伴们，把狗粮狠狠地撒在这里吧~'
)
const join = ref(1.1)
const content = ref(77)
</script>

<style scoped>
.iconfont {
  font-size: 50px;
  float: left;
  margin-top: 5px;
  margin-left: 10px;
}
.title {
  font-size: 20px;
  font-weight: 700;
  margin-top: 20px;
  margin-left: 70px;
}
.detail {
  color: rgb(183, 184, 194);
  margin-left: 70px;
}
.number {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 50px;
}
.dynamic {
  margin-top: 10px;
}
</style>
