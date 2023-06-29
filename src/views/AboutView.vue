<script lang="ts">
import IncreaseButton from '../components/IncreaseButton.vue'

export default {
  components: {
    IncreaseButton
  }
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <IncreaseButton title="First" />
    <IncreaseButton title="Second" />
    <IncreaseButton title="Third" />
    <IncreaseButton title="Fourth" />
    <IncreaseButton title="Fifth" />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
