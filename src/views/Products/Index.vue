<script setup lang="ts">
import TitleBar from '@/components/TitleBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <TitleBar title="Products">
    <div class="panel is-shadowless border-with-title">
      <div class="panel-block">
        <div class="control">
          <RouterView />
        </div>
      </div>
    </div>
  </TitleBar>
</template>
