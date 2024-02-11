/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #보통 #array

  ### 질문

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > GitHub에서 보기: https://tsch.js.org/4425/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// 1
// type ArrayWithLength<
//   T extends number,
//   U extends any[] = [],
// > = U['length'] extends T
//   ? U
//   : ArrayWithLength<T, [1, ...U]>

// type GreaterThan<
//   T extends number,
//   U extends number,
// > = ArrayWithLength<U> extends [...ArrayWithLength<T>, ...infer _] ? false : true

// 2
// type GreaterThan<T extends number, U extends number, R extends any[] = []> =
//   T extends R['length']
//     ? false
//     : U extends R['length']
//       ? true
//       : GreaterThan<T, U, [...R, 1]>

type GreaterThan<
  T extends number | string,
  U extends number | string,
  R = false,
> = `${T}` extends `${infer TF}${infer TR}`
  ? `${U}` extends `${infer UF}${infer UR}`
    ? [TF & UF] extends [never]
        ? GreaterThan<TR, UR, '0123456789' extends `${string}${TF}${string}${UF}${string}` ? false : true >
        : GreaterThan<TR, UR, R>
    : true
  : U extends '' ? R : false

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/4425/answer/ko
  > 정답 보기: https://tsch.js.org/4425/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
