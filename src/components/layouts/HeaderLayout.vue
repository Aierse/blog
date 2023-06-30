<template>
  <header>
    <h1><RouterLink to="/">&lt;Aierse /&gt;</RouterLink></h1>
    <nav>
      <ul>
        <li>
          <a href="https://github.com/Aierse"
            ><img src="../../assets/images/header/github.svg"
          /></a>
        </li>
        <li>
          <a href="https://www.notion.so/7146b8d22aee45488825a58f3e2dbe6d">
            <img src="../../assets/images/header/notion.svg" />
          </a>
        </li>
      </ul>
    </nav>
  </header>
  <hr />
</template>

<style scoped>
* {
  user-select: none;
  color: var(--main-color);
}

header {
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

li {
  display: inline-block;
  text-align: center;
}

li img {
  width: 4rem;
}
</style>
