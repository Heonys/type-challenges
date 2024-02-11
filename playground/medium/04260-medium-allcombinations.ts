/*
  4260 - AllCombinations
  -------
  by 蛭子屋双六 (@sugoroku-y) #보통 #template-literal #infer #union

  ### 질문

  Implement type ```AllCombinations<S>``` that return all combinations of strings which use characters from ```S``` at most once.

  For example:

  ```ts
  type AllCombinations_ABC = AllCombinations<'ABC'>;
  // should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
  ```

  > GitHub에서 보기: https://tsch.js.org/4260/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type String2Union<T extends string> = T extends `${infer First}${infer Rest}`
  ? First | String2Union<Rest>
  : never

type AllCombinations<
  T extends string,
  S extends string = String2Union<T>,
> = [S] extends [never]
  ? ''
  : '' | {
    [K in S]: `${K}${AllCombinations<never, Exclude<S, K>>}`
  }[S]

/*
MEMO: 문자열 템플릿 리터럴에서 유니온타입은 분배법칙이 일어난다
      `${A}${AllCombinations<never, "B">}`
  ->   "A" | `${A}${AllCombinations<never, "B">}`
  ->   "A" | `${A}${B}${AllCombinations<never, never>}`
  ->   "A" | "AB"
*/

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<AllCombinations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>,
  Expect<Equal<AllCombinations<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/4260/answer/ko
  > 정답 보기: https://tsch.js.org/4260/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
