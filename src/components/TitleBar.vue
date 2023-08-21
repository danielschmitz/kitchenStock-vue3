<script setup lang="ts">
const props = defineProps(['title', 'subtitle'])
</script>
<template>
  <section class="hero is-light">
    <div class="hero-body">
      <p class="title">{{ props.title }}</p>
      <p class="subtitle">{{ props.subtitle }}</p>
    </div>
  </section>
</template>
