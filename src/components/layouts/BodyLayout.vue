<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from '../SideBar.vue'
</script>

<template>
  <main>
    <RouterView />
    <SideBar />
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;

  margin: 4rem 40rem;
}
</style>
