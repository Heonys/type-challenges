/*
  114 - CamelCase
  -------
  by Anthony Fu (@antfu) #어려움 #template-literal

  ### 질문

  Implement `CamelCase<T>` which converts `snake_case` string to `camelCase`.

  For example

  ```ts
  type camelCase1 = CamelCase<'hello_world_with_types'> // expected to be 'helloWorldWithTypes'
  type camelCase2 = CamelCase<'HELLO_WORLD_WITH_TYPES'> // expected to be same as previous one
  ```

  > GitHub에서 보기: https://tsch.js.org/114/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// type CamelCase<
//   S extends string,
//   L extends string = Lowercase<S>,
//   R extends string = '',
// > = L extends `${infer First}_${infer Rest1}`
//   ? Rest1 extends `_${infer Rest2}`
//     ? CamelCase<never, Capitalize<Rest2>, `${R}${First}_`>
//     : CamelCase<never, Capitalize<Rest1>, `${R}${First}`>
//   : `${R}${L}`

type CamelCase<S extends string> = S extends `${infer F}_${infer R1}${infer R2}`
  ? Uppercase<R1> extends Lowercase<R1>
    ? `${Lowercase<F>}_${CamelCase<`${R1}${R2}`>}`
    : `${Lowercase<F>}${Uppercase<R1>}${CamelCase<R2>}`
  : Lowercase<S>

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo__bar'>, 'foo_Bar'>>,
  Expect<Equal<CamelCase<'foo_$bar'>, 'foo_$bar'>>,
  Expect<Equal<CamelCase<'foo_bar_'>, 'fooBar_'>>,
  Expect<Equal<CamelCase<'foo_bar__'>, 'fooBar__'>>,
  Expect<Equal<CamelCase<'foo_bar_$'>, 'fooBar_$'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/114/answer/ko
  > 정답 보기: https://tsch.js.org/114/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
