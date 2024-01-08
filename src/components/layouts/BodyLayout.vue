<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <section>
      <RouterView />
    </section>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  justify-content: center;
  margin: 4rem 0;

  @media (max-width: 1023px) {
    > section {
      width: 90%;
      text-align: center;
    }
  }

  @media (min-width: 1024px) {
    > section {
      width: 50%;
      text-align: center;
    }
  }
}
</style>
