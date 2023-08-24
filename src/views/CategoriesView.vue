<script setup lang="ts">
import TitleBar from '@/components/TitleBar.vue'
import type Category from '@/dto/Category'
import Spinner from '@/components/Spinner.vue'
import CategoryService from '@/services/CategoryService'
import { ref, onMounted } from 'vue'

const categories = ref<Category[]>()
const loading = ref<Boolean>(false)

onMounted(async () => {
  loading.value = true
  categories.value = await CategoryService.getAll()
  loading.value = false
})
</script>

<template>
  <TitleBar title="Categorias" sub-title="Lista de categorias dos produtos">
    <Spinner v-if="loading"></Spinner>
    <nav v-else class="panel is-shadowless border-with-title">
      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Search" />
          <span class="icon is-left">
            <i class="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>

      <a v-for="category in categories" class="panel-block is-active" :key="category.id">
        <span class="icon is-left">
          <i class="fas fa-right-long" aria-hidden="true"></i>
        </span>
        {{ category.name }}
      </a>

      <!-- <a class="panel-block is-active">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true"></i>
      </span>
      bulma
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true"></i>
      </span>
      marksheet
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true"></i>
      </span>
      minireset.css
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true"></i>
      </span>
      jgthms.github.io
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <i class="fas fa-code-branch" aria-hidden="true"></i>
      </span>
      daniellowtw/infboard
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <i class="fas fa-code-branch" aria-hidden="true"></i>
      </span>
      mojs
    </a> -->
    </nav>
    <div class="field is-grouped is-grouped-centered">
      <button class="button is-primary">Create</button>
    </div>
  </TitleBar>
</template>
