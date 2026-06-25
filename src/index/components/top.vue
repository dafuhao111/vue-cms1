<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="top">
    <div class="top-right">
      <span class="username">{{ userStore.userInfo?.username }}</span>
      <el-button type="danger" size="small" @click="handleLogout">退出登录</el-button>
    </div>
  </div>
</template>

<style scoped>
  .top {
    width: 100%;
    height: 60px;
    background: #fff;
    border-bottom: 1px solid #dcdfe6;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 24px;
    box-sizing: border-box;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  }
  .top-right {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .username {
    font-size: 14px;
    color: #303133;
    font-weight: 500;
  }
</style>