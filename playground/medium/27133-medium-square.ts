/*
  27133 - Square
  -------
  by null (@aswinsvijay) #보통 #tuple #array #math

  ### 질문

  Given a number, your type should return its square.

  > GitHub에서 보기: https://tsch.js.org/27133/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type Absolute<T extends number> = `${T}` extends `-${infer R extends number}` ? R : T

type SplitZero<T extends number, U extends string = ''> =
  `${T}` extends `${infer R extends number}0`
    ? SplitZero<R, `${U}00`>
    : [T, U]

type Number2Tuple<N, R extends any[] = []> = R['length'] extends N
  ? R
  : Number2Tuple<N, [...R, 1]>

type SquareTuple<
  N extends number,
  Cur extends any[] = [],
  R extends any[] = [],
  S extends any[] = Number2Tuple<N>,
> = Cur['length'] extends N
  ? R
  : SquareTuple<N, [...Cur, 1], [...R, ...S]>

type Square<
  N extends number,
  S extends [number, string] = SplitZero<N>,
  R extends any[] = SquareTuple<Absolute<S[0]>>,
> = `${R['length']}${S[1]}` extends `${infer R extends number}` ? R : never

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<100>, 10000>>,

  // Negative numbers
  Expect<Equal<Square<-2>, 4>>,
  Expect<Equal<Square<-5>, 25>>,
  Expect<Equal<Square<-31>, 961>>,
  Expect<Equal<Square<-50>, 2500>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/27133/answer/ko
  > 정답 보기: https://tsch.js.org/27133/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
