/*
  7561 - Subtract
  -------
  by Lo (@LoTwT) #매우 어려움 #tuple

  ### 질문

  Implement the type Subtraction that is ` - ` in Javascript by using BuildTuple.

  If the minuend is less than the subtrahend, it should be `never`.

  It's a simple version.

  For example

  ```ts
  Subtract<2, 1> // expect to be 1
  Subtract<1, 2> // expect to be never
  ```

  > GitHub에서 보기: https://tsch.js.org/7561/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type ParseInt<T> = T extends `${infer R extends number}` ? R : T

type RemoveZero<T> = T extends '0'
  ? T
  : T extends `${infer F}${infer R}` ? F extends '0' ? RemoveZero<R> : T : T

type Reverse<T> = T extends `${infer F}${infer R}`
  ? `${Reverse<R>}${F}`
  : ''

type NextNumber = { '0': '1', '1': '2', '2': '3', '3': '4', '4': '5', '5': '6', '6': '7', '7': '8', '8': '9' }

type PlusOne<T extends string> = T extends `${infer F}${infer R}`
  ? F extends '9'
    ? `0${PlusOne<R>}`
    : `${NextNumber[F & keyof NextNumber]}${R}`
  : '1'

type ReversedSubtract<
  M extends string,
  S extends string,
> = `${M}` extends `${infer F1}${infer R1}`
  ? `${S}` extends `${infer F2}${infer R2}`
    ? F1 extends F2
      ? `0${ReversedSubtract<R1, R2>}`
      : F2 extends '0'
        ? `${F1}${ReversedSubtract<R1, R2>}`
        : ReversedSubtract<PlusOne<M>, PlusOne<S>>
    : ''
  : `${S}` extends `${infer _}${infer _}` ? never : M

// M => minuend, S => subtrahend
type Subtract<
  M extends number,
  S extends number,
> = ParseInt<RemoveZero<Reverse<ReversedSubtract<Reverse<`${M}`>, Reverse<`${S}`>>>>>

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  Expect<Equal<Subtract<1000, 999>, 1>>,
  Expect<Equal<Subtract<10000, 9999>, 1>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/7561/answer/ko
  > 정답 보기: https://tsch.js.org/7561/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
