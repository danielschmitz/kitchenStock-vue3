<script setup lang="ts">
import type Category from '@/dto/Category'
import Spinner from '@/components/Spinner.vue'
import AlertDanger from '@/components/AlertDanger.vue'
import CategoryService from '@/services/CategoryService'
import { ref, onMounted } from 'vue'
import type { AxiosError } from 'axios'

const categories = ref<Category[]>()
const loading = ref<Boolean>(false)
const errorMessage = ref<string>('')
const search = ref<string>('')

onMounted(async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    categories.value = await CategoryService.getAll()
  } catch (error: AxiosError | any) {
    errorMessage.value = (error as AxiosError).response?.data as string
  } finally {
    loading.value = false
  }
})

const onSearch = async (event: Event) => {
  errorMessage.value = ''
  try {
    categories.value = await CategoryService.search(search.value)
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
      :to="`/categories/edit/${category.id}`"
      v-for="category in categories"
      class="panel-block is-active"
      :key="category.id"
    >
      <span class="icon is-left">
        <i class="fas fa-right-long" aria-hidden="true"></i>
      </span>
      {{ category.name }}
    </RouterLink>
  </nav>
  <div class="field is-grouped is-grouped-centered">
    <RouterLink to="/categories/create"><a class="button is-primary">New Category</a></RouterLink>
  </div>
  <AlertDanger v-if="errorMessage">{{ errorMessage }}</AlertDanger>
</template>
