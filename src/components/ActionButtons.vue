<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="field is-grouped is-grouped-centered pt-5">
    <RouterLink to="/stock/add">
      <a class="button is-primary mr-2">Adicionar Item ao Estoque</a>
    </RouterLink>
    <RouterLink to="/products/Create">
      <a class="button is-primary">Criar Novo Produto</a>
    </RouterLink>
  </div>
</template>
