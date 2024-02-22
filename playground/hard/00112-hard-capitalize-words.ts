/*
  112 - Capitalize Words
  -------
  by Anthony Fu (@antfu) #어려움 #template-literal

  ### 질문

  Implement `CapitalizeWords<T>` which converts the first letter of **each word of a string** to uppercase and leaves the rest as-is.

  For example

  ```ts
  type capitalized = CapitalizeWords<'hello world, my friends'> // expected to be 'Hello World, My Friends'
  ```

  > GitHub에서 보기: https://tsch.js.org/112/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// type CapitalizeWords<S extends string, R extends string = ''> =
//   S extends `${string}${' ' | '.' | ','}${infer Rest}`
//     ? S extends `${infer Head}${Rest}`
//       ? CapitalizeWords<Rest, `${R}${Capitalize<Head>}`>
//       : never
//     : `${R}${Capitalize<S>}`

type CapitalizeWords<S, R extends string = ''> = S extends `${infer First}${infer Rest}`
  ? Uppercase<First> extends Lowercase<First>
    ? CapitalizeWords<Capitalize<Rest>, `${R}${First}`>
    : CapitalizeWords<Rest, `${R}${First}`>
  : Capitalize<R>

/*
Uppercase와 Lowercase가 같은 경우는 알파벳이 아니라고 판단하는 핵심 아이디어
*/

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<Equal<CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>, 'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'>>,
  Expect<Equal<CapitalizeWords<''>, ''>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/112/answer/ko
  > 정답 보기: https://tsch.js.org/112/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
