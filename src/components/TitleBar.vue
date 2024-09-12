<script setup lang="ts">
defineProps<{
  title?: string
  subTitle?: string
}>()
</script>

<template>
  <section class="hero is-small">
      <p class="title">{{ title }}</p>
  </section>
  <div class="container"><slot /></div>
</template>

<style scoped>
.hero {
  background-color: rgba(128, 128, 128, 0.1); /* Cinza neutro com 10% de opacidade */
  padding: 2rem 1.5rem;
}

.title {
  color: var(--text-color);
}

.subtitle {
  color: var(--text-color-secondary, var(--text-color));
  opacity: 0.8;
}
</style>
