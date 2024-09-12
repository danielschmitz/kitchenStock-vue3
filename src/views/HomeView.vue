<script setup lang="ts">
import TitleBar from '../components/TitleBar.vue'
import AlertDanger from '../components/AlertDanger.vue'
import ActionButtons from '../components/ActionButtons.vue'
import { auth } from '../auth'
import { onMounted, ref } from 'vue'
import type Stock from '@/dto/Stock'
import StockService from '@/services/StockService'
import Spinner from '@/components/Spinner.vue'
import utils from '@/utils'
import { useRoute } from 'vue-router'
import router from '@/router'
import type Category from '@/dto/Category'
import CategoryService from '@/services/CategoryService'

const stockList = ref<Stock[]>()
const categories = ref<Category[]>()
const filteredStockList = ref<Stock[]>()
const loading = ref<boolean>(false)
const selectedCategory = ref<number | null>(null)

const checkDate = (date) => {
  if (utils.isDateLessToday(date)) return 'red'
  if (utils.isDateLessOneMonth(date)) return 'yellow'
  return 'black'
}

const changeStock = (id) => {
  router.push({ path: `/stock/edit/${id}` })
}

const filterByCategory = (category: number | null) => {
  console.log(category)
  selectedCategory.value = category
  if (category) {
    filteredStockList.value = stockList.value?.filter(stock => stock.product?.categoryId === category) || []
  } else {
    filteredStockList.value = stockList.value || []
  }
}

onMounted(async () => {
  loading.value = true
  stockList.value = await StockService.getAll()
  categories.value = await CategoryService.getAll()
  filteredStockList.value = stockList.value || []
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
        <ActionButtons />
        <br />
        <Spinner v-if="loading"></Spinner>

        <div v-else class="ml-5 mr-5">
          <div class="buttons is-centered mb-4">
            <button class="button is-link" :class="{ 'is-primary': selectedCategory === null }" @click="filterByCategory(null)">
              Todos
            </button>
            <button v-for="category in categories" 
                    :key="category" 
                    class="button" 
                    :class="{ 'is-primary': selectedCategory === category.name }"
                    @click="filterByCategory(category.id)">
              {{ category.name }}
            </button>
          </div>

          <table class="table is-fullwidth is-bordered is-striped is-narrow is-hoverable">
            <tbody>
              <tr v-for="stock in filteredStockList" :key="stock.id" @click="changeStock(stock.id)">
                <td class="quantity">{{ stock.quantity }}</td>
                <td>{{ stock.product?.name }} ({{ stock.product?.supplier }}) </td>
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
  color: brown!important;
  font-weight: bold;
}

.yellow {
  color: darkgoldenrod!important;
  font-weight: bold;
}

.black {
  color: black;
  font-weight: normal;
}

</style>
