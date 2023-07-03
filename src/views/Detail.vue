<script>
import { useRoute } from 'vue-router'
import VueMarkdownIt from 'vue3-markdown-it'

export default {
  components: { VueMarkdownIt },
  data() {
    return {
      md: ''
    }
  },
  setup() {
    const route = useRoute()
    const fileName = route.params.fileName

    return {
      fileName: fileName
    }
  },

  async created() {
    const { default: url } = await import(`../assets/posts/${this.fileName}.md`)
    const res = await fetch(url)

    const md = await res.text()
    this.md = md
  }
}
</script>

<template>
  <article>
    <h1>{{ fileName }}</h1>
    <hr />
    <VueMarkdownIt class="md-body" :source="md" />
  </article>
</template>

<style>
article > h1 {
  margin-bottom: 0.8rem;
}
article > hr {
  border-top: 0.1rem solid var(--main-color);
  border-radius: 50%;
}

.md-body {
  font-size: 1.6rem;
  text-align: left;
  padding: 0 1.6rem;
}

.md-body :not(:last-child) {
  margin-bottom: 0.8rem;
}

.md-body :where(h1, h2, h3, h4, h5, h6) {
  border-top: 1px solid var(--main-color);
  border-bottom: 1px solid var(--main-color);
}

.md-body > pre {
  background: #f7f7f7;
}
</style>
