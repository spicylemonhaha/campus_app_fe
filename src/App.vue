<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
/*每个页面公共css */
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import '@/static/iconfont.css';
@import 'uview-plus/index.scss';
/* 官方css库 */
@import "@/static/common/uni.css";
/* 动画库 */
@import "@/static/common/animate.css";
/* 自定义样式库 */
@import "@/static/common/free.css";
/* 全局样式 */
@import "@/static/common/common.css";
</style>
