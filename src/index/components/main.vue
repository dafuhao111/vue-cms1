<script setup lang="ts">

import Aside from "@/index/components/aside.vue";
import Content from "@/index/components/content.vue";
</script>

<template>
  <div class="main">
    <Aside></Aside>
    <Content></Content>
  </div>
</template>

<style scoped>
  .main{
    flex: 1;
    display: flex;
    overflow: hidden;
  }
</style>