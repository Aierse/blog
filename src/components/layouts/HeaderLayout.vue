<template>
  <header>
    <h1>&lt;Aierse /&gt;</h1>
    <nav>
      <ul>
        <li><RouterLink to="/Vue">Vue</RouterLink></li>
        <li><RouterLink to="/React">React</RouterLink></li>
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
  padding: 2.4rem 40rem;
  align-items: center;
  justify-content: space-between;
}

h1 {
  cursor: pointer;
}

hr {
  border-top: 0.1rem solid var(--main-color);
  border-radius: 50%;
}

li {
  display: inline-block;
  font-size: 2.4rem;
  font-weight: bold;
  text-align: center;

  min-width: 12rem;
  padding: 1.2rem;
  border-left: 0.1rem solid var(--main-color);
}

li:last-child {
  border-right: 0.1rem solid var(--main-color);
}
</style>
