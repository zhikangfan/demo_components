<script setup>
import ss from './index.module.less'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Top, Service } from '@element-plus/icons-vue'
const showBackToTop = ref(false)

const handleScroll = () => {
  const top = window.scrollY || document.documentElement.scrollTop
  showBackToTop.value = top > 60
}
const handleBackTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<template>
  <div :class="ss.sideBar">
    <el-popover class="box-item" placement="left">
      <template #reference>
        <div :class="[ss.btn]">
          <el-icon :size="24"><Service /></el-icon>
        </div>
      </template>
      <div :class="ss.qrCode">
        <img src="https://cdn1.ruanqing.com/yinpin/img/ruanqing_qr_code.png" alt="" />
      </div>
    </el-popover>
    <div :class="[ss.btn]" v-show="showBackToTop" @click="handleBackTop">
      <el-icon :size="24"><Top /></el-icon>
    </div>
  </div>
</template>
