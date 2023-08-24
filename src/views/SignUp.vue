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
  email: '',
  password: '',
  phone: ''
})

const loading = ref<boolean>(false)
const errorMessage = ref<string>('')

const submitForm = async (event: Event) => {
  event.preventDefault()
  loading.value = true
  errorMessage.value = ''
  try {
    const result: UserSignUp = await UserService.createUser(form.value)
    auth.login(result.accessToken)
    router.push('')
  } catch (error: AxiosError | any) {
    errorMessage.value = (error as AxiosError).response?.data as string
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <TitleBar title="SignUp" sub-title="Crie uma conta para poder logar">
    <AlertDanger v-if="errorMessage">{{ errorMessage }}</AlertDanger>
    <form @submit="submitForm">
      <div class="login m-5">
        <div class="columns">
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
                  placeholder="Name"
                />
              </div>
            </div>
          </div>
          <div class="column">
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
        </div>

        <div class="columns">
          <div class="column">
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
          <div class="column">
            <div class="field">
              <label class="label">Phone</label>
              <div class="control">
                <input
                  class="input"
                  v-model="form.phone"
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="field is-grouped is-grouped-centered">
        <button class="button is-primary" :disabled="loading" type="submit">Enviar</button>
      </div>
    </form>
  </TitleBar>
</template>

<style scoped></style>
