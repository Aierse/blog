<script setup lang="ts">
import { ref, computed } from 'vue'

const keyword = ref('')
const posts = await import.meta.glob('../assets/posts/*')

const fileList: string[] = []

for (const t in posts) {
  fileList.push(t.split('/').pop()?.replace('.md', '') as string)
}

const searchResult = computed(() => {
  return keyword.value === '' ? fileList : fileList.filter((v) => v.includes(keyword.value))
})
</script>

<template>
  <input v-model="keyword" name="search" type="search" autocomplete="off" />
  <section v-for="name in searchResult">
    <h3>
      <RouterLink :to="'/detail/' + name">{{ name }}</RouterLink>
    </h3>
  </section>
</template>

<style scoped lang="scss">
input[name='search'] {
  width: 100%;
  padding: 0.4rem 0.8rem;
  margin-bottom: 2rem;

  text-align: center;

  border: 1px solid var(--main-color);
  border-radius: 100rem;
}

section:not(:last-child) {
  margin-bottom: 0.8rem;
}

h3 {
  padding: 0.8rem;
}
</style>
