/*
  8804 - Two Sum
  -------
  by PsiloLau (@Psilocine) #어려움 #array #math

  ### 질문

  For example

  ```ts
  type sum1 = TwoSum<[3, 2, 4], 6> // true
  type sum2 = TwoSum<[2, 7, 11, 15], 15> // false
  ```

  > GitHub에서 보기: https://tsch.js.org/8804/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type NumberToTuple<T, R extends any[] = []> = R['length'] extends T
  ? R
  : NumberToTuple<T, [...R, 1]>

type MappingBy<T extends any[], R extends number> = {
  [K in keyof T]: [...NumberToTuple<T[K]>, ...NumberToTuple<R>]['length']
}
type Includes<T extends any[], S> = S extends T[number] ? true : false

type SubTwoSum<
  T extends number[],
  U extends number,
> = T extends [infer First extends number, ...infer Rest extends number[]]
  ? [...MappingBy<Rest, First>, ...SubTwoSum<Rest, U>]
  : []

type TwoSum< T extends number[], U extends number> = Includes<SubTwoSum<T, U>, U>

// type NumberToTuple<T extends number, R extends any[] = []> = R['length'] extends T
//   ? R
//   : NumberToTuple<T, [...R, 1 ]>

// type TwoSum<
//   T extends number[],
//   U extends number,
// > = T extends [infer First extends number, ...infer Rest extends number[]]
//   ? NumberToTuple<U> extends [...NumberToTuple<First>, ...infer R]
//     ? R['length'] extends Rest[number]
//       ? true
//       : TwoSum<Rest, U>
//     : false
//   : false

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/8804/answer/ko
  > 정답 보기: https://tsch.js.org/8804/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
