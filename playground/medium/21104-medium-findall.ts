/*
  21104 - FindAll
  -------
  by tunamagur0 (@tunamagur0) #보통 #template-literal #string

  ### 질문

  Given a pattern string P and a text string T, implement the type `FindAll<T, P>` that returns an Array that contains all indices (0-indexed) from T where P matches.

  > GitHub에서 보기: https://tsch.js.org/21104/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// type StringToLength<T, R extends any[] = []> = T extends `${string}${infer Rest}`
//   ? StringToLength<Rest, [...R, 1]>
//   : R['length']

// type FindAll<
//   T extends string,
//   P extends string,
//   Cur extends any[] = [],
//   Prev extends string = '',
//   R extends any[] = [],
// > = P extends ''
//   ? []
//   : T extends `${infer First}${infer Rest}`
//     ? Prev extends `${infer F}${P}`
//       ? FindAll<Rest, P, [...Cur, 1], `${Prev}${First}`, [...R, StringToLength<F>]>
//       : FindAll<Rest, P, [...Cur, 1], `${Prev}${First}`, R>
//     : Prev extends `${infer F}${P}`
//       ? [...R, StringToLength<F>]
//       : R

type FindAll<
  T extends string,
  P extends string,
  L extends any[] = [],
> = P extends ''
  ? []
  : T extends `${string}${infer Rest}`
    ? [
        ...(T extends `${P}${string}` ? [L['length']] : []),
        ...FindAll<Rest, P, [...L, 1]>,
      ]
    : []

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/21104/answer/ko
  > 정답 보기: https://tsch.js.org/21104/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
