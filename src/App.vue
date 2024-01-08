<script setup lang="ts">
import HeaderLayout from './components/layouts/HeaderLayout.vue'
import BodyLayout from './components/layouts/BodyLayout.vue'
</script>

<template>
  <HeaderLayout />
  <Suspense>
    <BodyLayout />
  </Suspense>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap');

:root {
  --main-color: rgb(20, 196, 35);
  --serve-color: #444;
}

* {
  margin: 0;
  padding: 0;
  line-height: 1.5;
  letter-spacing: 0.2rem;
  font-family: 'Nanum Gothic', sans-serif;

  &,
  &::after,
  &::before {
    box-sizing: border-box;
  }
}

html {
  font-size: 62.5%;
}

ul,
ol {
  list-style: none;
}

a {
  color: sienna;
  text-decoration: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

h1 {
  font-size: 3.2rem;
}

h2 {
  font-size: 2.4rem;
}

h3 {
  font-size: 1.9rem;
}

h4 {
  font-size: 1.6rem;
}

h5 {
  font-size: 1.3rem;
}

h6 {
  font-size: 1.1rem;
}
</style>
