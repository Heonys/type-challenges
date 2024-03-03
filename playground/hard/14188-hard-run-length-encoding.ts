/*
  14188 - Run-length encoding
  -------
  by Hen Hedymdeith (@alfaproxima) #어려움

  ### 질문

  Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
  Also make a decoder for that string.

  > GitHub에서 보기: https://tsch.js.org/14188/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

namespace RLE {
  export type Encode<
  S extends string,
  Count extends any[] = [],
  Prev extends string = S extends `${infer First}${string}` ? First : never,
  R extends string = '',
> = S extends `${infer First}${infer Rest}`
  ? First extends Prev
    ? Encode<Rest, [...Count, 1], Prev, R>
    : Encode<Rest, [1], First, `${R}${Count['length'] extends 1 ? '' : Count['length']}${Prev}`>
  : `${R}${Count['length'] extends 1 ? '' : Count['length']}${Prev}`

  type Repeat<
    T extends string,
    U extends number,
    Cur extends any[] = [1],
    R extends string = T,
  > = Cur['length'] extends U
    ? R
    : Repeat<T, U, [...Cur, 1], `${R}${T}`>

  export type Decode<
    S extends string,
    R extends string = '',
  > = S extends `${infer Fisrt}${infer Second}${infer Rest}`
    ? Fisrt extends `${infer N extends number}`
      ? Decode<Rest, `${R}${Repeat<Second, N>}`>
      : Decode<`${Second}${Rest}`, `${R}${Fisrt}`>
    : `${R}${S}`
}

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/14188/answer/ko
  > 정답 보기: https://tsch.js.org/14188/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
