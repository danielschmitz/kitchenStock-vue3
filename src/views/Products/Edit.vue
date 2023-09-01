<script setup lang="ts">
import AlertDanger from '@/components/AlertDanger.vue'
import Spinner from '@/components/Spinner.vue'
import Category from '@/dto/Category'
import type Product from '@/dto/Product'
import router from '@/router'
import CategoryService from '@/services/CategoryService'
import ProductService from '@/services/ProductService'
import type { AxiosError } from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const form = ref<Product>({
  id: 0,
  name: '',
  supplier: '',
  categoryId: 0
})
const categories = ref<Category[]>()
const route = useRoute()
const loading = ref<boolean>(false)
const errorMessage = ref<string>('')

onMounted(async () => {
  try {
    loading.value = true
    categories.value = await CategoryService.getAll()
    const id = route.params.id.toString()
    const product = await ProductService.getById(id)
    form.value = product
  } catch (error) {
    errorMessage.value = 'Product Not Found'
  } finally {
    loading.value = false
  }
})

const submitForm = async (event: Event) => {
  event.preventDefault()
  loading.value = true
  errorMessage.value = ''
  try {
    await ProductService.edit(form.value, route.params.id.toString())
    router.push({ path: '/products' })
  } catch (error: AxiosError | any) {
    errorMessage.value = (error as AxiosError).response?.data as string
  } finally {
    loading.value = false
  }
}

const onDelete = async (event: Event) => {
  event.preventDefault()
  if (confirm('Tem certeza que deseja remover?')) {
    loading.value = true
    errorMessage.value = ''
    try {
      const id = form.value.id || 0
      await ProductService.delete(id)
      router.push({ path: '/products' })
    } catch (error: AxiosError | any) {
      errorMessage.value = (error as AxiosError).response?.data as string
    } finally {
      loading.value = false
    }
  }
}
</script>

<template>
  <Spinner v-if="loading"></Spinner>
  <div v-else>
    <AlertDanger v-if="errorMessage" class="mt-1">{{ errorMessage }}</AlertDanger>
    <div v-else>
      <form @submit="submitForm">
        <div class="columns m-3">
          <div class="column">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input
                  required
                  class="input"
                  v-model="form.name"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Product Name"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Marca</label>
              <div class="control">
                <input
                  required
                  class="input"
                  v-model="form.supplier"
                  type="text"
                  id="supplier"
                  name="supplier"
                  placeholder="Marca"
                />
              </div>
            </div>
          </div>
          <div class="column">
        <div class="field">
          <label class="label">Categoria</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select id="categoryId" name="categoryId" v-model="form.categoryId">
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
        </div>

        <div class="field is-grouped is-grouped-right pr-1">
          <div class="control">
            <button class="button is-primary" :disabled="loading" type="submit">
              Save Product
            </button>
          </div>
          <div class="control">
            <RouterLink to="/products"><a class="button is-light">Back</a></RouterLink>
          </div>
        </div>
      </form>
      <div class="field is-grouped is-grouped-centered m-6 p-6">
        <div class="control">
          <button class="button is-danger" :disabled="loading" type="submit" @click="onDelete">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
