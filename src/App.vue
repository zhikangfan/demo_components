<script setup>
const disableRightClick = (e) => {
  e.preventDefault()
}
</script>

<template>
  <RouterView @contextmenu="disableRightClick" />
</template>

<style scoped></style>
