<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/Navbar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped></style>
