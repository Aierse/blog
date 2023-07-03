<script>
import VueMarkdownIt from 'vue3-markdown-it'
import test from '../assets/posts/a.md?raw'

export default {
  components: {
    VueMarkdownIt
  },

  data() {
    return {
      test: test
    }
  }
}
</script>

<template>
  <h1>설명</h1>
  <h1>설명</h1>
  <h1>설명</h1>
  <h1>설명</h1>
  <h1>설명</h1>
  <h1>설명</h1>
  <h1>설명</h1>
  <h1>설명</h1>
  <h1>설명</h1>
  <h1>설명</h1>
  <h1>설명</h1>
  <VueMarkdownIt class="md-body" :source="test" />
</template>

<style></style>
