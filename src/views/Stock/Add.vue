<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type Product from '@/dto/Product'
import ProductService from '@/services/ProductService'
import StockService from '@/services/StockService'
import utils from '@/utils'
import router from '@/router'
import AlertDanger from '@/components/AlertDanger.vue'
import type Stock from '@/dto/Stock'
import type { AxiosError } from 'axios'

const formData = ref<Stock>({
  expires: utils.today,
  added: utils.today,
  quantity: 1,
  price: 0,
  productId: 101
})

const products = ref<Product[]>()
const loading = ref<boolean>(false)
const errorMessage = ref<string>('')

onMounted(async () => {
  products.value = await ProductService.getAll()
})

const submitForm = async (event: Event) => {
  event.preventDefault()
  loading.value = true
  try {
    await StockService.create(formData.value)
    router.push('/')
  } catch (error) {
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
          <label class="label">Product</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select id="productId" name="productId" v-model="formData.productId">
                <option v-for="product in products" :key="product.id" :value="product.id">
                  {{ product.name }} ({{ product.supplier }})
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label class="label">Quantity</label>
          <div class="control">
            <input
              required
              class="input"
              v-model="formData.quantity"
              type="number"
              min="0"
              id="quantity"
              name="quantity"
              placeholder="Quantity"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="columns m-3">
      <div class="column">
        <div class="field">
          <label class="label">Expires</label>
          <div class="control">
            <input
              required
              class="input"
              v-model="formData.expires"
              type="date"
              id="expires"
              name="expires"
              placeholder="Expires at"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Price</label>
          <div class="control">
            <input
              required
              class="input"
              v-model="formData.price"
              type="float"
              id="price"
              name="price"
              placeholder="Price"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right pr-5">
      <div class="control">
        <button class="button is-primary" :disabled="loading" type="submit">Add</button>
      </div>
      <div class="control">
        <RouterLink to="/"><a class="button is-light">Back</a></RouterLink>
      </div>
    </div>
  </form>
</template>
