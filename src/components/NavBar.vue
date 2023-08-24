<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img src="../assets/logo.png" />
      </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/">Home</RouterLink>
        <RouterLink class="navbar-item" to="/categories" v-if="auth.isLogged()">Categories</RouterLink>
        <RouterLink class="navbar-item" to="/about" v-if="auth.isLogged()">Products</RouterLink>

        <!-- <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> More </a>
  
            <div class="navbar-dropdown">
              <a class="navbar-item"> About </a>
              <a class="navbar-item"> Jobs </a>
              <a class="navbar-item"> Contact </a>
              <hr class="navbar-divider" />
              <a class="navbar-item"> Report an issue </a>
            </div>
          </div> -->
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <div v-if="auth.isLogged()">
              <a @click="logout" class="button is-primary"> Logout </a>
            </div>
            <div v-else>
              <RouterLink to="/signup" class="button is-primary"> Sign up </RouterLink>
              <RouterLink to="/login" class="button is-light"> Login </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <hr style="margin: 0px" />
</template>

<script setup lang="ts">
import { auth } from '@/auth'
import router from '@/router';

const logout = async (event: Event) => {
  event?.preventDefault()
  auth.logout()
  router.push({path: '/'})
} 

</script>
