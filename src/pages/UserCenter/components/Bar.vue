<template>
  <view class="bar-box">
    <view v-for="(item, index) in props.barArr" :key="item.title">
      <view class="bar-content">
        <view class="bar-des">
          <text
            ><uni-icons
              :custom-prefix="item.isCustom"
              color="#54536E"
              :type="item.icon"
              size="22"
            ></uni-icons
          ></text>
          <text class="title">{{ item.title }}</text>
        </view>
        <view class="bar-arrow">
          <uni-icons color="#363837" type="right" size="16"></uni-icons>
        </view>
      </view>
      <view v-if="index < props.barArr.length - 1" class="line"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
interface Props {
  barArr: barObj[]
}
interface barObj {
  icon?: string
  title: string
  isCustom?: string
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped>
.bar-content {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  font-weight: 400;
  font-size: 14px;
}
.bar-box {
  background-color: rgba(253, 255, 254, 0.92);
  padding: 0 12px;
  border-radius: 10px;
}
.bar-des,
.bar-arrow {
  display: flex;
  align-items: center;
}
.title {
  padding-left: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #333634;
}
.line {
  height: 1px;
  background-color: rgb(204, 204, 204);
  transform: scaleY(0.5);
}
</style>
