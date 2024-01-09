<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import Highlight from 'markdown-it-highlightjs'
import hljs from 'highlight.js'

const route = useRoute()
const fileName = route.params.fileName
const text = ref('<h2>데이터를 불러올 수 없습니다.</h2>')

onMounted(async () => {
  const { default: url } = await import(`../assets/posts/${fileName}.md`)
  const res = await fetch(url)

  const markdown = new MarkdownIt()
  markdown.use(Highlight, { hljs })
  text.value = markdown.render(await res.text())
})
</script>

<template>
  <h1>{{ fileName }}</h1>
  <hr />
  <article name="content" v-html="text"></article>
</template>

<style scoped lang="scss">
hr {
  border-top: 0.1rem solid var(--main-color);
  border-radius: 50%;

  margin-block: 0.8rem;
}

article {
  font-size: 1.6rem;
  text-align: left;
  padding: 0 1.6rem;
}
</style>

<style lang="scss">
article[name='content'] {
  > hr {
    border-top: 0.1rem solid var(--main-color);
    border-radius: 50%;

    margin: 0.8rem 0;
  }

  :where(p) {
    margin-block: 0.4rem;
  }

  :where(h1, h2, h3, h4, h5, h6) {
    text-align: center;
  }

  h1 {
    padding-block: 3.2rem;
  }

  h2 {
    padding-block: 2.4rem;
  }

  h3 {
    padding-block: 1.9rem;
  }

  h4 {
    padding-block: 1.6rem;
  }

  h5 {
    padding-block: 1.3rem;
  }

  h6 {
    padding-block: 1.1rem;
  }

  a {
    font-weight: bold;
  }

  > ul {
    list-style: disc;
    padding-left: 2.4rem;
    margin-block: 2rem;
  }

  > blockquote {
    border-left: 0.4rem solid var(--main-color);
    background: #f6f8fa;
    padding: 0.8rem;
  }

  > p {
    > img {
      width: 100%;
    }

    > code {
      background: #e5e5e5;
      border-radius: 0.4rem;
      padding-inline: 0.4rem;
    }
  }
}
</style>
