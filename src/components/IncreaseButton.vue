<template>
  <button @click="increment">{{ title }}: {{ count }}</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
}>()

const count = ref(0)
function increment() {
  count.value++
}
</script>

<style scoped></style>
