<template>
  <view class="prefer-box">
    <view class="data">{{ props.data }}</view>
    <view class="title">{{ props.title }}</view>
  </view>
</template>

<script setup lang="ts">
interface Props {
  data: number
  title: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped>
.prefer-box {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.data {
  padding: 8px 0;
  font-size: 15px;
  font-weight: 600;
}
.title {
  font-size: 12px;
  color: rgb(147, 155, 155);
}
</style>
