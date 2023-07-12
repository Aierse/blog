<script>
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import Highlight from 'markdown-it-highlightjs'
import hljs from 'highlight.js'

export default {
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
  },
  computed: {
    renderedContent() {
      const md = new MarkdownIt()
      md.use(Highlight, { hljs })

      return md.render(this.md)
    }
  }
}
</script>

<template>
  <h1>{{ fileName }}</h1>
  <hr />
  <article v-html="renderedContent"></article>
</template>

<style scoped lang="scss">
hr {
  border-top: 0.1rem solid var(--main-color);
  border-radius: 50%;

  margin: 0.8rem 0;
}

article {
  font-size: 1.6rem;
  text-align: left;
  padding: 0 1.6rem;

  :not(:last-child) {
    margin-bottom: 0.8rem;
  }

  :where(h1, h2, h3, h4, h5, h6) {
    padding: 2.4rem 0;
    text-align: center;
  }
}
</style>

<style lang="scss">
article {
  > hr {
    border-top: 0.1rem solid var(--main-color);
    border-radius: 50%;

    margin: 0.8rem 0;
  }

  > ul {
    list-style: disc;
    padding-left: 2.4rem;
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
      padding: 0 0.4rem;
    }
  }
}
</style>
