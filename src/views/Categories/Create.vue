<script setup lang="ts">
import AlertDanger from '@/components/AlertDanger.vue'
import type Category from '@/dto/Category'
import router from '@/router'
import CategoryService from '@/services/CategoryService'
import type { AxiosError } from 'axios'
import { ref } from 'vue'

const form = ref<Category>({
  name: ''
})

const loading = ref<boolean>(false)
const errorMessage = ref<string>('')

const submitForm = async (event: Event) => {
  event.preventDefault()
  loading.value = true
  errorMessage.value = ''
  try {
    // todo: verificar por nome
    await CategoryService.create(form.value)
    router.push('/categories')
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
      <div class="column is-offset-3 is-6">
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
              placeholder="Category Name"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button class="button is-primary" :disabled="loading" type="submit">Create Category</button>
      </div>
      <div class="control">
        <RouterLink to="/categories"><a class="button is-light">Back</a></RouterLink>
      </div>
    </div>
  </form>
</template>
