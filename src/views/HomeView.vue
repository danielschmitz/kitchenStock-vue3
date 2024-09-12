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
import { auth as firebaseAuth, provider } from '@/firebaseConfig'
import { signInWithPopup, signOut } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'

const stockList = ref<Stock[]>()
const categories = ref<Category[]>()
const filteredStockList = ref<Stock[]>()
const loading = ref<boolean>(false)
const selectedCategory = ref<number | null>(null)
const user = ref(null)

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
    filteredStockList.value =
      stockList.value?.filter((stock) => stock.product?.categoryId === category) || []
  } else {
    filteredStockList.value = stockList.value || []
  }
}

const getQuantityClass = (quantity: number) => {
  if (quantity <= 5) return 'is-danger'
  if (quantity <= 10) return 'is-warning'
  return 'is-success'
}

const getExpirationClass = (date: string) => {
  if (utils.isDateLessToday(date)) return 'is-danger'
  if (utils.isDateLessOneMonth(date)) return 'is-warning'
  return 'is-success'
}

const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, provider)
    user.value = result.user
  } catch (error) {
    console.error('Erro ao fazer login:', error)
  }
}

const logout = async () => {
  try {
    await signOut(firebaseAuth)
    user.value = null
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
  }
}

onMounted(async () => {
  loading.value = true
  stockList.value = await StockService.getAll()
  categories.value = await CategoryService.getAll()
  filteredStockList.value = stockList.value || []
  loading.value = false
})

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    console.log(user.value)
  })
})
</script>
<template>
  <TitleBar title="Estoque" :withBorder="false">
    <div class="block pt-2">
      <div v-if="!user">
        <button @click="loginWithGoogle">Login com Google</button>
      </div>
      <div v-else>
        <button @click="logout">Logout</button>
        <ActionButtons />
        <br />
        <Spinner v-if="loading"></Spinner>

        <div v-else class="stock-container">
          <div class="filters mb-4">
            <button
              class="button"
              :class="{ 'is-primary': selectedCategory === null }"
              @click="filterByCategory(null)"
            >
              Todos
            </button>
            <button
              v-for="category in categories"
              :key="category.id"
              class="button"
              :class="{ 'is-primary': selectedCategory === category.id }"
              @click="filterByCategory(category.id)"
            >
              {{ category.name }}
            </button>
          </div>

          <!-- Tabela para telas maiores -->
          <table class="table is-fullwidth is-hoverable stock-table is-hidden-mobile">
            <thead>
              <tr>
                <th>Quantidade</th>
                <th>Produto</th>
                <th>Fornecedor</th>
                <th>Validade</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="stock in filteredStockList" :key="stock.id" @click="changeStock(stock.id)">
                <td class="has-text-centered">
                  <span class="tag is-medium" :class="getQuantityClass(stock.quantity)">
                    {{ stock.quantity }}
                  </span>
                </td>
                <td>{{ stock.product?.name }}</td>
                <td>{{ stock.product?.supplier }}</td>
                <td>
                  <span class="tag" :class="getExpirationClass(stock.expires)">
                    {{ $filters.formatDate(stock.expires) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Cards para telas menores -->
          <div class="stock-cards is-hidden-tablet">
            <div
              v-for="stock in filteredStockList"
              :key="stock.id"
              class="card mb-4"
              @click="changeStock(stock.id)"
            >
              <div class="card-content">
                <div class="content">
                  <h4 class="title is-4">{{ stock.product?.name }}</h4>
                  <p class="subtitle is-6">{{ stock.product?.supplier }}</p>
                  <div class="tags" style="display: flex; justify-content: space-between">
                    <div class="tag is-medium" :class="getQuantityClass(stock.quantity)">
                      Quantidade: {{ stock.quantity }}
                    </div>
                    <div class="tag" :class="getExpirationClass(stock.expires)">
                      Validade: {{ $filters.formatDate(stock.expires) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TitleBar>
</template>

<style scoped>
.stock-container {
  background-color: var(--background-color-secondary);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.stock-table {
  background-color: var(--background-color);
  border-radius: 8px;
  overflow: hidden;
}

.stock-table th {
  background-color: var(--background-color-tertiary);
  color: var(--text-color);
  font-weight: 600;
}

.stock-table td {
  vertical-align: middle;
  color: var(--text-color);
}

.stock-table tr:hover {
  background-color: var(--background-color-hover);
  cursor: pointer;
}

/* Estilos para o modo claro */
:root {
  --background-color: #ffffff;
  --background-color-secondary: #f5f5f5;
  --background-color-tertiary: #e8e8e8;
  --background-color-hover: #f0f0f0;
  --text-color: #333333;
  --border-color: #dbdbdb;
}

/* Estilos para o modo escuro */
:root[data-theme='dark'] {
  --background-color: #1a1a1a;
  --background-color-secondary: #2c2c2c;
  --background-color-tertiary: #3a3a3a;
  --background-color-hover: #404040;
  --text-color: #ffffff;
  --border-color: #4a4a4a;
}

/* Ajustes adicionais para o modo escuro */
:root[data-theme='dark'] .stock-table {
  border: 1px solid var(--border-color);
}

:root[data-theme='dark'] .button:not(.is-primary) {
  background-color: var(--background-color-tertiary);
  color: var(--text-color);
  border-color: var(--border-color);
}

:root[data-theme='dark'] .button:not(.is-primary):hover {
  background-color: var(--background-color-hover);
}

:root[data-theme='dark'] .tag:not(.is-danger):not(.is-warning):not(.is-success) {
  background-color: var(--background-color-tertiary);
  color: var(--text-color);
}

.stock-cards .card {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s ease;
}

.stock-cards .card:hover {
  background-color: var(--background-color-hover);
  cursor: pointer;
}

.stock-cards .card-content {
  padding: 1rem;
}

.stock-cards .tags {
  margin-top: 0.5rem;
}

/* Estilos para o modo claro */
:root {
  /* ... variáveis existentes ... */
}

/* Estilos para o modo escuro */
:root[data-theme='dark'] {
  /* ... variáveis existentes ... */
}

/* Ajustes adicionais para o modo escuro */
:root[data-theme='dark'] .stock-cards .card {
  border: 1px solid var(--border-color);
}

/* ... outros estilos existentes ... */
</style>
