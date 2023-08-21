<script setup lang="ts">
import TitleBar from '../components/TitleBar.vue'
import AlertDanger from '../components/AlertDanger.vue'
import { auth } from '../auth'
</script>

<template>
  <TitleBar title="Bem vindo" sub-title="Bem vindo a uma aplicação de exemplo com Vue" />

  <div class="block pt-2">
    <div v-if="!auth.isLogged()">
      <AlertDanger>Você não está logado. Clique em login/signup</AlertDanger>
    </div>
    <div v-else>
      login..
    </div>
  </div>
</template>
