<script setup lang="ts">
defineProps<{
  title?: string
  subTitle?: string
}>()
</script>
<template>
  <section class="hero is-light">
    <div class="hero-body">
      <p class="title">{{ title }}</p>
      <p class="subtitle">{{ subTitle }}</p>
    </div>
  </section>
  <div class="container"><slot /></div>
</template>
