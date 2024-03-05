/*
  476 - Sum
  -------
  by null (@uid11) #매우 어려움 #math #template-literal

  ### 질문

  Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.

  For example,

  ```ts
  type T0 = Sum<2, 3> // '5'
  type T1 = Sum<'13', '21'> // '34'
  type T2 = Sum<'328', 7> // '335'
  type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
  ```

  > GitHub에서 보기: https://tsch.js.org/476/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type PaeseInt<T extends string> = T extends `${infer F extends number}` ? F : never

type NumberToTuple<
  T extends string,
  R extends any[] = [],
> = R['length'] extends PaeseInt<T> ? R : NumberToTuple<T, [...R, 1]>

type StringToTuple<T extends string> = T extends `${infer F}${infer R}` ? [F, ...StringToTuple<R>] : []

type Reverse<T extends string> = `${T}` extends `${infer F}${infer R}` ? `${Reverse<R>}${F}` : ''

type Computed<T extends string, U extends string, Carry extends string = '0'> = `${T}${U}` extends `${infer R1}${infer R2}`
  ? StringToTuple<`${[...NumberToTuple<R1>, ...NumberToTuple<R2>, ...NumberToTuple<Carry>]['length'] & number}`>
  : never

type ReversedSum<
  A extends string,
  B extends string,
  Carry extends string = '',
  S extends string = '',
> = A extends `${infer F1}${infer R1}`
  ? B extends `${infer F2}${infer R2}`
    ? Carry extends ''
      ? Computed<F1, F2> extends [infer X extends string, infer Y extends string]
        ? ReversedSum<R1, R2, X, `${Y}${S}`>
        : Computed<F1, F2> extends [infer X extends string]
          ? ReversedSum<R1, R2, '', `${X}${S}`>
          : never
      : Computed<F1, F2, Carry> extends [infer X extends string, infer Y extends string]
        ? ReversedSum<R1, R2, X, `${Y}${S}`>
        : Computed<F1, F2, Carry> extends [infer X extends string]
          ? ReversedSum<R1, R2, '', `${X}${S}`>
          : never
    : Carry extends ''
      ? `${Reverse<A>}${S}`
      : ReversedSum<A, '0', Carry, S>
  : B extends `${infer _}${infer _}`
    ? ReversedSum<B, A, Carry, S>
    : `${Carry}${S}`

type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint,
> = ReversedSum<Reverse<`${A}`>, Reverse<`${B}`>>

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/476/answer/ko
  > 정답 보기: https://tsch.js.org/476/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
