<script setup lang="ts"></script>

<template>
  <div class="spinner"></div>
</template>

<style>
.spinner {
  width: 100%;
  height: 4px;
  margin:5px;
  background-color: #eee;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: scaleX(0);
  }
  50% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}
</style>
