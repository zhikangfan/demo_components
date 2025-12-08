<template>
  <div
    style="width: 750px; margin-top: 20px; margin-left: auto; margin-right: auto"
    v-for="(i, idx) in data"
    :key="idx"
  >
    <div class="h-[38px] w-full">
      <PinYinLine />
    </div>
  </div>
</template>
<script setup lang="ts">
const data = new Array(20).fill(1)
import PinYinLine from '@/components/Icon/PinYinLine.vue'
</script>
