/*
  216 - Slice
  -------
  by Anthony Fu (@antfu) #매우 어려움 #array

  ### 질문

  Implement the JavaScript `Array.slice` function in the type system. `Slice<Arr, Start, End>` takes the three argument. The output should be a subarray of `Arr` from index `Start` to `End`. Indexes with negative numbers should be counted from reversely.

  For example

  ```ts
  type Arr = [1, 2, 3, 4, 5]
  type Result = Slice<Arr, 2, 4> // expected to be [3, 4]
  ```

  > GitHub에서 보기: https://tsch.js.org/216/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// type NumberToTuple<T, R extends any[] = []> = R['length'] extends T
//   ? R
//   : NumberToTuple<T, [...R, 1]>

// type Slice<
//   Arr extends any[],
//   Start extends number = 0,
//   End extends number = [...Arr, 1]['length'],
//   Cur extends any[] = [],
//   R extends any[] = [],
// > = End extends 0
//   ? []
//   : `${Start}` extends `-${infer Digit extends number}`
//     ? NumberToTuple<Digit> extends [...infer R, 1]
//       ? Slice<Arr, R['length'], End>
//       : never
//     : `${End}` extends `-${infer Digit extends number}`
//       ? NumberToTuple<Arr['length']> extends [...infer R, ...NumberToTuple<Digit>]
//         ? Slice<Arr, Start, R['length']>
//         : never
//       : NumberToTuple<Start> extends [...Cur, ...infer _]
//         ? Start extends Cur['length']
//           ? Arr extends [infer First, ...infer Rest]
//             ? Slice<Rest, Start, End, [...Cur, 1], [...R, First]>
//             : R
//           : Arr extends [number, ...infer Rest]
//             ? Slice<Rest, Start, End, [...Cur, 1], R>
//             : R
//         : Cur['length'] extends End
//           ? R
//           : Arr extends [infer First, ...infer Rest]
//             ? Slice<Rest, Start, End, [...Cur, 1], [...R, First]>
//             : R

type ToPositive<Arr extends any[], N extends number> = `${N}` extends `-${infer F extends number}`
  ? Slice<Arr, F>['length']
  : N

type GetElementByN<Arr extends any[], N extends number, R extends any[] = []> =
  R['length'] extends N | Arr['length']
    ? R
    : GetElementByN<Arr, N, [...R, Arr[R['length']]]>

type Slice<Arr extends any[], Start extends number = 0, End extends number = Arr['length']> =
  GetElementByN<Arr, ToPositive<Arr, End>> extends [...GetElementByN<Arr, ToPositive<Arr, Start>>, ...infer R]
    ? R
    : []

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/216/answer/ko
  > 정답 보기: https://tsch.js.org/216/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
