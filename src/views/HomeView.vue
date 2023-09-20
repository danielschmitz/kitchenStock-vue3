<script setup lang="ts">
import TitleBar from '../components/TitleBar.vue'
import AlertDanger from '../components/AlertDanger.vue'
import { auth } from '../auth'
import { onMounted, ref } from 'vue'
import type Stock from '@/dto/Stock'
import StockService from '@/services/StockService'
import Spinner from '@/components/Spinner.vue'
import utils from '@/utils'

const stockList = ref<Stock[]>()
const loading = ref<boolean>(false)

const checkDate = (date) => {
  if (utils.isDateLessToday(date)) return 'red'
  if (utils.isDateLessOneMonth(date)) return 'yellow'
  return 'black'
}

onMounted(async () => {
  loading.value = true
  stockList.value = await StockService.getAll()
  loading.value = false
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
          <RouterLink to="/stock/add"
            ><a class="button is-primary mr-2">Add Item to Stock</a></RouterLink
          >
          <RouterLink to="/products/Create"
            ><a class="button is-primary">Create a New Product</a></RouterLink
          >
        </div>
        <br />
        <Spinner v-if="loading"></Spinner>
        <div v-else class="ml-5 mr-5">
          <table class="table is-fullwidth is-bordered is-striped is-narrow is-hoverable">
            <tbody>
              <tr v-for="stock in stockList" :key="stock.id">
                <td class="quantity">{{ stock.quantity }}</td>
                <td>{{ stock.product?.name }} ({{ stock.product?.supplier }}) {{ utils.isDateLessOneMonth(stock.expires) ? 'yellow' : 'black'  }} </td>
                <td style="width: 55px" 
                    :class="checkDate(stock.expires)">{{ $filters.formatDate(stock.expires) }}</td>
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

.red {
  color: brown;
  font-weight: bold;
}

.yellow {
  color: darkgoldenrod;
  font-weight: bold;
}

.black {
  color: black;
  font-weight: normal;
}

</style>
