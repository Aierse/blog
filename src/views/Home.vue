<script setup lang="ts">
const posts = import.meta.glob('../assets/posts/*')

const fileList: string[] = []

for (const t in posts) {
  fileList.push(t.split('/').pop()?.replace('.md', '') as string)
}
</script>

<template>
  <section v-for="name in fileList">
    <h3>
      <RouterLink :to="'/detail/' + name">{{ name }}</RouterLink>
    </h3>
  </section>
</template>

<style scoped lang="scss">
section:not(:last-child) {
  margin-bottom: 0.8rem;
}

h3 {
  padding: 0.8rem;
}
</style>
