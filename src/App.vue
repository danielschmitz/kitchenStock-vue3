<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { onMounted } from 'vue'
import { TOKEN_KEY, auth } from './auth'

onMounted(() => {
  const token = localStorage.getItem(TOKEN_KEY) || ''
  if (token != '') auth.login(token)
})
</script>

<template>
  <header>
    <NavBar />
  </header>
  <RouterView />
</template>

<style scoped></style>
