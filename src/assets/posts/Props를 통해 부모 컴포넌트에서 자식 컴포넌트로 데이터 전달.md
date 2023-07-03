클릭시 count가 상승하는 버튼에 title을 전달하는 예제를 만들어보자

#### 자식 컴포넌트

```vue
<template>
  <button @click="increment">{{ title }}: {{ count }}</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
}>()

const count = ref(0)
function increment() {
  count.value++
}
</script>
```

defineProps에서 title: string 형이라는 사실을 명시해준다.

title을 명시해야만 templete에서 해당 props를 사용할 수 있다.

#### 부모 컴포넌트

```vue
<script lang="ts">
import IncreaseButton from '../components/IncreaseButton.vue'

export default {
  components: {
    IncreaseButton
  }
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <IncreaseButton title="First" />
    <IncreaseButton title="Second" />
    <IncreaseButton title="Third" />
    <IncreaseButton title="Fourth" />
    <IncreaseButton title="Fifth" />
  </div>
</template>
```

부모 컴포넌트에서는 먼저 IncreaseButton을 import 한다.

export default에서 components에서 IncreaseButton을 export에서 템플릿에서 사용할 수 있도록 한다.

templete에서 IncreaseButton을 사용하고 props로 title로 값을 전달한다.

![image](https://github.com/Aierse/vue-Practice/assets/68111814/2ad0ae87-25aa-43a2-9455-d803b29150c0)

{title}: {count} 텍스트가 담긴 버튼이 여러개 만들어졌다.
