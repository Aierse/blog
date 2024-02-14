개발을 하다보면 비밀번호 길이 체크같은 유효성 검사나, 값의 범위를 검사하는 경우가 자주 생깁니다.

이런 코드를 작성하면 꽤나 장황한 문구로 생성되죠.

```js
if (value > start && value < end)
// or
if (start < value && value < end)
```

SQL에서는 이러한 범위 값 판정을 between으로 해결합니다.

```sql
SELECT *
FROM some_table
WHERE value BETWEEN 10 AND 20
```

**만약 NodeJS에서 SQL의 between을 사용할 수 있다면 어떨까요?**

```js
if (value in between(start, end))
```

깔끔하고 명시적인 프로그래밍이 가능해집니다.

## 설치

**between 라이브러리를 설치합니다.**

> npm i @aierse/between

## 사용법

```js
import between from '@aierse/between'
// const between = require("@aierse/between")

const value = 10

console.log(value in between(5, 15)) // true 5 < value < 15
console.log(value in between(15, 5)) // true 5 < value < 15
console.log(value in between(5, 10)) // false
console.log(value in between(10, 15)) // false

console.log('b' in between('a', 'c')) // true 'a' < 'b' < 'c'

console.log(value in between(5, 10, true)) // true 5 <= value <= 10

console.log(value in between(10, 15, { start: true })) // true 10 <= value < 15

console.log(value in between(5, 10, { end: true })) // false 5 < value <= 10

const now = new Date('2024-02-10')

const begin = new Date('2024-02-01')
const end = new Date('2024-02-15')

console.log(now in between(begin, end)) // true 2024-02-01 < now < 2024-02-15
```

#### 사용 가능한 형식

- number
- string
- Date
