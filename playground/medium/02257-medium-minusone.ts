/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #보통 #math

  ### 질문

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > GitHub에서 보기: https://tsch.js.org/2257/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// 문자열로 표현된 숫자를 파싱하는 타입
type ParseInt<T extends string> = T extends `${infer Digit extends number}` ? Digit : never

// 문자열을 뒤집는 타입
type ReverseString<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${ReverseString<Rest>}${First}`
  : ''

// 문자열 앞의 0을 제거하는 타입
type RemoveLeadingZeros<S extends string> = S extends '0'
  ? S
  : S extends `${'0'}${infer R}`
    ? RemoveLeadingZeros<R>
    : S

// 문자열로 표현된 숫자에서 1을 빼기
type InternalMinusOne< S extends string > = S extends `${infer Digit extends number}${infer Rest}`
  ? Digit extends 0
    ? `9${InternalMinusOne<Rest>}`
    : `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Rest}`
  : never

type MinusOne<T extends number> = T extends 0
  ? -1
  : ParseInt<RemoveLeadingZeros<ReverseString<InternalMinusOne<ReverseString<`${T}`>>>>>

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<5555>, 5554>>,
  Expect<Equal<MinusOne<10000>, 9999>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/2257/answer/ko
  > 정답 보기: https://tsch.js.org/2257/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
