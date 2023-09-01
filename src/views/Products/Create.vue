<script setup lang="ts">
import AlertDanger from '@/components/AlertDanger.vue'
import Category from '@/dto/Category'
import type Product from '@/dto/Product'
import router from '@/router'
import CategoryService from '@/services/CategoryService'
import ProductService from '@/services/ProductService'
import type { AxiosError } from 'axios'
import { ref, onMounted } from 'vue'

const form = ref<Product>({
  name: '',
  supplier: '',
  categoryId: 0
})

const loading = ref<boolean>(false)
const errorMessage = ref<string>('')
const categories = ref<Category[]>()

onMounted(async () => {
  categories.value = await CategoryService.getAll()
  console.log(categories.value)
})

const submitForm = async (event: Event) => {
  event.preventDefault()
  loading.value = true
  errorMessage.value = ''
  try {
    await ProductService.create(form.value)
    router.push('/products')
  } catch (error: AxiosError | any) {
    errorMessage.value = (error as AxiosError).response?.data as string
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AlertDanger v-if="errorMessage">{{ errorMessage }}</AlertDanger>
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
            <!-- <input
              required
              class="input"
              v-model="form.categoryId"
              type="text"
              id="name"
              name="name"
              placeholder="Product Name"
            /> -->
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

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button class="button is-primary" :disabled="loading" type="submit">Create Product</button>
      </div>
      <div class="control">
        <RouterLink to="/products"><a class="button is-light">Back</a></RouterLink>
      </div>
    </div>
  </form>
</template>
