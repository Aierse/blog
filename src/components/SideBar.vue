<template>
  <nav>
    <ul>
      <li><RouterLink to="/">엄청난 아이템1</RouterLink></li>
      <li><RouterLink to="/">엄청난 아이템2</RouterLink></li>
      <li><RouterLink to="/">엄청난 아이템3</RouterLink></li>
      <li><RouterLink to="/">엄청난 아이템4</RouterLink></li>
      <li><RouterLink to="/">엄청난 아이템5</RouterLink></li>
      <li>
        <RouterLink to="/">
          엄청난 아이템6엄청난 아이템6엄청난 아이템6엄청난 아이템6엄청난 아이템6엄청난 아이템6엄청난
          아이템6엄청난 아이템6엄청난 아이템6엄청난 아이템6엄청난 아이템6
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
* {
  user-select: none;
}

nav {
  border-left: 0.1rem solid var(--main-color);
}

ul {
  padding: 0 4rem;
}

li {
  padding: 0.8rem;
}

li > a {
  display: inline-block;
  color: var(--serve-color);
  font-size: 1.6rem;
  font-weight: bold;
  padding: 0.4rem;
  width: 24rem;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

a:hover {
  text-decoration: underline var(--serve-color);
}
</style>
