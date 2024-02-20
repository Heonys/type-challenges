/*
  27932 - MergeAll
  -------
  by scarf (@scarf005) #보통 #object #array #union

  ### 질문

  Merge variadic number of types into a new type. If the keys overlap, its values should be merged into an union.

  For example:

  ```ts
  type Foo = { a: 1; b: 2 }
  type Bar = { a: 2 }
  type Baz = { c: 3 }

  type Result = MergeAll<[Foo, Bar, Baz]> // expected to be { a: 1 | 2; b: 2; c: 3 }
  ```

  > GitHub에서 보기: https://tsch.js.org/27932/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type MergeAll<
  XS extends object[],
  U = XS[number],
  Keys extends PropertyKey = U extends U ? keyof U : never,
> = {
  [K in Keys]: U extends U ? U[K & keyof U] : never
}
/*
MergeAll<[{ a: 1, b: 2 }, { a: 2 }, { c: 3 }]> 라고 가정할때
U = { a: 1, b: 2 } | { a: 2 } | { c: 3 }
Keys = a | b | c
U와 Keys는 각각 이렇게 되므로
K는 맵드타입에서 a,b,c를 순회하고 U extends U 에서 분배법칙이 일어나서 U의 각각의 유니온을 순회하면서
U[K & keyof U] 부분에서 K속성을 가진 key값을 찾아서 유니온 으로 합친다

*/

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MergeAll<[]>, {} >>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<
    MergeAll<[{ a: string }, { a: string }]>,
    { a: string }
>
  >,
  Expect<Equal<
    MergeAll<[{ }, { a: string }]>,
    { a: string }
>
  >,
  Expect<Equal<
    MergeAll<[{ a: 1 }, { c: 2 }]>,
    { a: 1, c: 2 }
>
  >,
  Expect<Equal<
    MergeAll<[{ a: 1, b: 2 }, { a: 2 }, { c: 3 }]>,
    { a: 1 | 2, b: 2, c: 3 }
>
  >,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/27932/answer/ko
  > 정답 보기: https://tsch.js.org/27932/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
