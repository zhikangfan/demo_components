<script setup>
import ss from './index.module.less' // 正确的 CSS Modules 导入
</script>

<template>
  <footer :class="ss.footer">
    <div :class="ss.copyright">
      Copyright © {{ new Date().getFullYear() }} 昆山软擎网络科技有限公司
      <a href="https://beian.miit.gov.cn" target="_blank" style="color: #fff; margin: 0 10px"
        >苏ICP备2024152091号</a
      ><a href="/mianze.html" target="_blank" style="color: #fff">《免责声明》</a>
    </div>
  </footer>
</template>
