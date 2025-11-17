<script setup>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
import SideBar from '@/components/SideBar/index.vue'
</script>
<template>
  <div>
    <Header />
    <main class="pageContainer">
      <slot></slot>
    </main>
    <Footer />
    <SideBar />
  </div>
</template>
<style scoped>
.pageContainer {
  padding-top: 80px;
  min-height: calc(100vh - 50px);
}
</style>
