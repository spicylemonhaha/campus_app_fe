<template>
  <view class="box">
    <uni-nav-bar
      shadow
      fixed
      left-icon="left"
      right-icon="plusempty"
      @clickLeft="logout"
      @clickRight="showMenu = true"
    >
      <view class="title">
        <image
          v-if="avatar"
          style="width: 28px; height: 28px; padding-right: 6px"
          :src="avatar"
        />
        <text>{{ `${user.userID}-${user.userName}` }}</text>
      </view>
    </uni-nav-bar>
    <view class="drop-menu" v-if="showMenu">
      <view
        v-for="item in actionList"
        :key="item.action"
        class="item"
        @click="() => actionHandle(item)"
      >
        {{ item.text }}
      </view>
    </view>
    <view v-if="showMenu" class="mask" @click.stop="showMenu = false"></view>
  </view>
</template>

<script setup>
import useStore from '../../store/index'
import { ref, computed } from 'vue'
const store = useStore()

const showMenu = ref(false)
const actionList = ref([{ text: 'Create a 1v1 chat', action: 'index' }])
const user = computed(() => {
  return store.state.user
})
const avatar = computed(() => {
  return store.avatarMap[store.state.user.userID]
})
const logout = () => {
  console.log('asdasdsa')
  store.logout()
  uni.redirectTo({
    url: '../match/HelloWord',
  })
}
const actionHandle = (e) => {
  showMenu.value = false
  uni.navigateTo({
    url: '../Action/' + e.action,
  })
}
</script>

<style lang="scss">
.box {
  position: relative;

  .drop-menu {
    position: fixed;
    top: 24px;
    right: 32px;
    background-color: #fff;
    box-shadow: 0 0 2px 0 #e4e6ec;
    border: 1px solid #e4e6ec;
    border-radius: 5px;
    text-align: center;
    z-index: 999;

    .item {
      padding: 6px 4px;
      font-size: 12px;
      white-space: nowrap;
      color: #3b4144;

      & + .item {
        border-top: 1px solid #e4e6ec;
      }

      &:active,
      &:hover {
        background-color: #e6efec;
      }
    }
  }

  .mask {
    position: fixed;
    z-index: 996;
    width: 100%;
    height: 100%;
  }

  .title {
    display: flex;
    align-items: center;
    font-size: 16px;
    flex: 1;
    justify-content: center;
  }
}
</style>
