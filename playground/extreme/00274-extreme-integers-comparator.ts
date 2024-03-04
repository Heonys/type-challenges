/*
  274 - Integers Comparator
  -------
  by Pig Fang (@g-plane) #매우 어려움 #template-literal #math

  ### 질문

  Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:

  - If `a` is greater than `b`, type should be `Comparison.Greater`.
  - If `a` and `b` are equal, type should be `Comparison.Equal`.
  - If `a` is lower than `b`, type should be `Comparison.Lower`.

  **Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**

  > GitHub에서 보기: https://tsch.js.org/274/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// type NumberToTuple<T, R extends any[] = []> = R['length'] extends T
//   ? R
//   : NumberToTuple<T, [...R, 1]>

// type Comparator<A extends number, B extends number> = A extends B
//   ? Comparison.Equal
//   : `${A}` extends `-${infer F1 extends number}`
//     ? `${B}` extends `-${infer F2 extends number}`
//       ? Comparator<F2, F1>
//       : Comparison.Lower
//     : `${B}` extends `-${number}`
//       ? Comparison.Greater
//       : NumberToTuple<A> extends [...NumberToTuple<B>, ...any]
//         ? Comparison.Greater
//         : Comparison.Lower

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type CompareDigits<A extends string, B extends string>
= A extends B
  ? Comparison.Equal
  : '0123456789' extends `${string}${A}${string}${B}${string}`
    ? Comparison.Lower
    : Comparison.Greater

type CompareLength<A extends string, B extends string> = A extends `${string}${infer R1}`
  ? B extends `${string}${infer R2}`
    ? CompareLength<R1, R2>
    : Comparison.Greater
  : B extends `${string}${infer _}`
    ? Comparison.Lower
    : Comparison.Equal

type Compare<A extends string, B extends string> = CompareLength<A, B> extends Comparison.Equal
  ? `${A}` extends `${infer F1}${infer R1}`
    ? `${B}` extends `${infer F2}${infer R2}`
      ? F1 extends F2
        ? Compare<R1, R2>
        : CompareDigits<F1, F2>
      : never
    : `${B}` extends `${infer _}${infer _}`
      ? never
      : CompareDigits<A, B>
  : CompareLength<A, B>

type Comparator<A extends number, B extends number> = A extends B
  ? Comparison.Equal
  : `${A}` extends `-${infer F1}`
    ? `${B}` extends `-${infer F2}`
      ? Compare<F2, F1> // 둘다 음수
      : Comparison.Lower
    : `${B}` extends `-${number}`
      ? Comparison.Greater
      : Compare<`${A}`, `${B}`> // 둘다 양수

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>>,
  Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>>,
  Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/274/answer/ko
  > 정답 보기: https://tsch.js.org/274/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
