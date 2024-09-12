<script setup lang="ts">
interface Props {
  title?: string
  subTitle?: string
  withBorder?: boolean
}

withDefaults(defineProps<Props>(), {
  withBorder: true
})
</script>

<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">{{ title }}</p>
      <p class="subtitle">{{ subTitle }}</p>
    </div>
  </section>
  <div class="container">
    <div class="panel is-shadowless" :class="{ 'border-with-title': withBorder }">
      <div class="panel-block">
        <div class="control">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background-color: rgba(128, 128, 128, 0.1);
  padding: 2rem 1.5rem;
}

.title {
  color: var(--text-color);
}

.subtitle {
  color: var(--text-color-secondary, var(--text-color));
  opacity: 0.8;
}

.panel {
  background-color: var(--background-color);
  color: var(--text-color);
}

.border-with-title {
  border: 3px solid rgba(128, 128, 128, 0.1);
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
