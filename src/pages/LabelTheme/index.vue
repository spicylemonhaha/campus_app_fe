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
            contentNumber
          }}个内容</text
        >
      </view>
    </view>
    <dynamic
      class="dynamic"
      :userInfo="info"
      :imglist="imgList"
      :content="content"
    ></dynamic>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Dynamic from './components/Dynamic.vue'
import { getDynamicList } from '../../api'
import { onShow } from '@dcloudio/uni-app'
const title: string = ref('')
const join: number = ref(0)
const contentNumber: number = ref(0)
const desInfo: string = ref(
  '脱单的小伙伴们，把狗粮狠狠地撒在这里吧~脱单的小伙伴们，把狗粮狠狠地撒在这里吧~'
)
const info = reactive({})
const imgList = reactive([])
const content = ref('我可真是无语啊')
onShow(() => {
  getDynamicList({
    tag: '校园无语瞬间',
    dynamicType: '热门',
  }).then((res) => {
    console.log(res)
    join.value = res.ammountPeople / 10000
    let data = res.data.dynamicList[0]
    title.value = data.tag
    contentNumber.value = data.commentAmount
    info.name = data.userName
    info.avatar = 'https://cdn.uviewui.com/uview/album/2.jpg'
    if (imgList.toString() !== data.contentPicture.toString()) {
      imgList.push(...data.contentPicture)
    }
  })
})
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
