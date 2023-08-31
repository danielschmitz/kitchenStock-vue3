<script setup lang="ts">
import TitleBar from '@/components/TitleBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <TitleBar title="Products">
    <RouterView />
  </TitleBar>
</template>
