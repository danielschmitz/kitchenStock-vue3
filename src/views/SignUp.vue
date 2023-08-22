<script setup lang="ts">
import TitleBar from '@/components/TitleBar.vue'
</script>

<template>
  <TitleBar title="SignUp" sub-title="Crie uma conta para poder logar"></TitleBar>

  <div class="m-5">
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="Text input" />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="text" placeholder="Text input" />
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="text" placeholder="Text input" />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Phone</label>
          <div class="control">
            <input class="input" type="text" placeholder="Text input" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="field is-grouped is-grouped-centered has-background-light p-3 pt-6">
    <p class="control">
      <a class="button is-primary"> Enviar </a>
    </p>
  </div>

</template>

<style scoped></style>
