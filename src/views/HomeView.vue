<script setup lang="ts">
import TitleBar from '../components/TitleBar.vue'
import AlertDanger from '../components/AlertDanger.vue'
import { auth } from '../auth'
</script>

<template>
  <TitleBar title="Home">
    <div class="block pt-2">
      <div v-if="!auth.isLogged()">
        <AlertDanger>Você não está logado. Clique em login/signup</AlertDanger>
      </div>
      <div v-else>
        <div class="field is-grouped is-grouped-centered gap-10">
          <RouterLink to="/stock/add"><a class="button is-primary mr-2">Add Item to Stock</a></RouterLink>
          <RouterLink to="/products/Create"><a class="button is-primary">Create a New Product</a></RouterLink>
        </div>

        
        <br />
        list...
      </div>
    </div>
  </TitleBar>
</template>
