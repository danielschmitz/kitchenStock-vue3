<script setup lang="ts">

import TitleBar from '@/components/TitleBar.vue'
import { ref } from 'vue'
import UserService from '@/services/UserService'
import type User from '@/dto/User'
import type UserSignUp from '@/dto/UserSignUp'
import { AxiosError } from 'axios'
import AlertDanger from '@/components/AlertDanger.vue'
import { auth } from '@/auth'
import router from '@/router'

const form = ref<User>({
  name: '',
  email: 'admin@admin.com',
  password: 'admin123',
  phone: ''
})

const loading = ref<boolean>(false)
const errorMessage = ref<string>('')

const submitForm = async (event: Event) => {
  event.preventDefault()
  loading.value = true
  errorMessage.value = ''
  try {
    const result: UserSignUp = await UserService.login(form.value)
    auth.login(result.accessToken)
    router.push({path:'/'})
  } catch (error: AxiosError | any) {
    errorMessage.value = (error as AxiosError).response?.data as string
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <TitleBar title="Login" sub-title="Logue no sistema"></TitleBar>
  <AlertDanger v-if="errorMessage">{{ errorMessage }}</AlertDanger>
  <form @submit="submitForm">
    <div class="m-5 login">
      <div class="columns">
        <div class="column is-4 is-offset-2">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                required
                class="input"
                v-model="form.email"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                required
                minlength="5"
                class="input"
                v-model="form.password"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-grouped is-grouped-centered has-background-light p-3">
      <button class="button is-primary" :disabled="loading" type="submit">Enviar</button>
    </div>
  </form>
</template>

<style scoped></style>
