<script setup>
import { ConfigProvider } from 'ant-design-vue'
const disableRightClick = (e) => {
  e.preventDefault()
}
</script>

<template>
  <ConfigProvider
    :theme="{
      token: {
        colorPrimary: '#00b96b',
      },
    }"
  >
    <RouterView @contextmenu="disableRightClick" />
  </ConfigProvider>
</template>

<style scoped></style>
