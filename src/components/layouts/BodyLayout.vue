<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from '../SideBar.vue'
</script>

<template>
  <main>
    <span class="vertical"></span>
    <section>
      <RouterView />
    </section>
    <span class="vertical"></span>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  margin: 4rem 0;
}

section {
  width: 50%;
  text-align: center;
}

.vertical {
  display: inline-block;
  width: 0.1rem;

  background: linear-gradient(white, 8%, var(--main-color) 84%, white);
}

@media (max-width: 82rem) {
  section {
    width: 100%;
    text-align: center;
  }

  .vertical {
    display: none;
  }
}
</style>
