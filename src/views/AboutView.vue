<script lang="ts">
import IncreaseButton from '../components/IncreaseButton.vue'

const value = 'hello'

export default {
  data() {
    return {
      value: value
    }
  },
  components: {
    IncreaseButton
  }
}
</script>

<template>
  <div>
    <h1>This is an Practice page</h1>
    <IncreaseButton :title="value" />
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
