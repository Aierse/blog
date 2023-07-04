<template>
  <header>
    <div>
      <h1><RouterLink to="/">&lt;Aierse /&gt;</RouterLink></h1>
      <nav>
        <ul>
          <li v-for="{ href, src } in logos">
            <a :href="href"><img :src="src" /></a>
          </li>
        </ul>
      </nav>
    </div>
    <hr />
  </header>
</template>

<script setup lang="ts">
import githubLogo from '../../assets/images/header/github.svg'
import notionLogo from '../../assets/images/header/notion.svg'

const logos = [
  {
    href: 'https://github.com/Aierse',
    src: githubLogo
  },
  {
    href: 'https://www.notion.so/7146b8d22aee45488825a58f3e2dbe6d',
    src: notionLogo
  }
]
</script>

<style scoped>
* {
  user-select: none;
  color: var(--main-color);
}

header {
  position: sticky;
  top: 0;

  background: white;
}

div {
  display: flex;
  padding: 0.4rem 8rem;
  align-items: center;
  justify-content: space-between;
}

h1 {
  cursor: pointer;
}

ul {
  display: flex;
  gap: 2rem;
  align-items: center;
}

hr {
  border-top: 0.1rem solid var(--main-color);
  border-radius: 50%;
}

li img {
  --square-size: 4rem;

  width: var(--square-size);
  height: var(--square-size);
}

@media (max-width: 82rem) {
  div {
    padding: 0.4rem 1.2rem;
  }
}

@media (max-width: 40rem) {
  h1 {
    font-size: 3rem;
  }

  li img {
    --square-size: 2.4rem;

    width: var(--square-size);
    height: var(--square-size);
  }
}
</style>
