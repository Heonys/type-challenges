/*
  25170 - Replace First
  -------
  by George Flinn (@ProjectFlinn) #보통

  ### 질문

  Implement the type ReplaceFirst<T, S, R> which will replace the first occurrence of S in a tuple T with R. If no such S exists in T, the result should be T.

  > GitHub에서 보기: https://tsch.js.org/25170/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// type ReplaceFirst<
//   T extends readonly unknown[],
//   S,
//   R,
//   Prev extends any[] = [],
// > = T extends [infer First, ...infer Rest]
//   ? First extends S
//     ? [...Prev, R, ...Rest]
//     : ReplaceFirst<Rest, S, R, [...Prev, First]>
//   : []

type ReplaceFirst<T extends readonly unknown[], S, R>
  = T extends [infer First, ...infer Rest]
    ? First extends S
      ? [R, ...Rest]
      : [First, ...ReplaceFirst<Rest, S, R>]
    : []

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ReplaceFirst<[1, 2, 3], 3, 4>, [1, 2, 4]>>,
  Expect<Equal<ReplaceFirst<['A', 'B', 'C'], 'C', 'D'>, ['A', 'B', 'D']>>,
  Expect<Equal<ReplaceFirst<[true, true, true], true, false>, [false, true, true]>>,
  Expect<Equal<ReplaceFirst<[string, boolean, number], boolean, string>, [string, string, number]>>,
  Expect<Equal<ReplaceFirst<[1, 'two', 3], string, 2>, [1, 2, 3]>>,
  Expect<Equal<ReplaceFirst<['six', 'eight', 'ten'], 'eleven', 'twelve'>, ['six', 'eight', 'ten']>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/25170/answer/ko
  > 정답 보기: https://tsch.js.org/25170/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
