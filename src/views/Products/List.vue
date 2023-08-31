<script setup lang="ts">
import type Product from '@/dto/Product'
import Spinner from '@/components/Spinner.vue'
import AlertDanger from '@/components/AlertDanger.vue'
import ProductService from '@/services/ProductService'
import { ref, onMounted } from 'vue'
import type { AxiosError } from 'axios'

const products = ref<Product[]>()
const loading = ref<Boolean>(false)
const errorMessage = ref<string>('')
const search = ref<string>('')

onMounted(async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    products.value = await ProductService.getAll()
  } catch (error: AxiosError | any) {
    errorMessage.value = (error as AxiosError).response?.data as string
  } finally {
    loading.value = false
  }
})

const onSearch = async (event: Event) => {
  errorMessage.value = ''
  try {
    products.value = await ProductService.search(search.value)
  } catch (error: AxiosError | any) {
    errorMessage.value = (error as AxiosError).response?.data as string
  }
}
</script>

<template>
  <Spinner v-if="loading"></Spinner>
  <nav v-else class="panel is-shadowless border-with-title">
    <div class="panel-block">
      <p class="control has-icons-left">
        <input
          v-model="search"
          class="input"
          type="text"
          placeholder="Search"
          @keydown.enter="onSearch"
        />
        <span class="icon is-left">
          <i class="fas fa-search" aria-hidden="true"></i>
        </span>
      </p>
    </div>

    <RouterLink
      :to="`/products/edit/${product.id}`"
      v-for="product in products"
      class="panel-block is-active"
      :key="product.id"
    >
      <span class="icon is-left">
        <i class="fas fa-right-long" aria-hidden="true"></i>
      </span>
      {{ product.name }}
    </RouterLink>
  </nav>
  <div class="field is-grouped is-grouped-centered">
    <RouterLink to="/products/create"><a class="button is-primary">New Product</a></RouterLink>
  </div>
  <AlertDanger v-if="errorMessage">{{ errorMessage }}</AlertDanger>
</template>
