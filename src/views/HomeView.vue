<script setup lang="ts">
import TitleBar from '../components/TitleBar.vue'
import AlertDanger from '../components/AlertDanger.vue'
import { auth } from '../auth'
import { onMounted, ref } from 'vue';
import type Stock from '@/dto/Stock';
import StockService from '@/services/StockService';



const stockList = ref<Stock[]>()

onMounted(async () => {
  stockList.value = await StockService.getAll()
})
</script>

<template>
  <TitleBar title="Home">
    <div class="block pt-2">
      <div v-if="!auth.isLogged()">
        <AlertDanger>Você não está logado. Clique em login/signup</AlertDanger>
      </div>
      <div v-else>
        <div class="field is-grouped is-grouped-centered">
          <RouterLink to="/stock/add"><a class="button is-primary mr-2">Add Item to Stock</a></RouterLink>
          <RouterLink to="/products/Create"><a class="button is-primary">Create a New Product</a></RouterLink>
        </div>
        <br />
        <div class="ml-5 mr-5">
        <table class="table is-fullwidth is-bordered is-striped is-narrow is-hoverable">
          <tbody>
            <tr v-for="stock in stockList" :key="stock.id">
              <td class="quantity">{{ stock.quantity }}</td>
              <td>{{ stock.product?.name }} ({{ stock.product?.supplier }})</td>
              <td style="width: 55px;">{{  $filters.formatDate(stock.expires) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  </TitleBar>
</template>

<style>

.quantity {
  width: 35px;
  text-align: right;
}

tr {
  cursor: pointer;
}

</style>
