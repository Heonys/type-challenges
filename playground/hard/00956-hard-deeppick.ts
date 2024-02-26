/*
  956 - DeepPick
  -------
  by hiroya iizuka (@hiroyaiizuka) #어려움 #deep

  ### 질문

  Implement a type DeepPick, that extends Utility types `Pick`.
  A type takes two arguments.

  For example:

  ```ts
  type obj = {
    name: 'hoge',
    age: 20,
    friend: {
      name: 'fuga',
      age: 30,
      family: {
        name: 'baz',
        age: 1
      }
    }
  }

  type T1 = DeepPick<obj, 'name'>   // { name : 'hoge' }
  type T2 = DeepPick<obj, 'name' | 'friend.name'>  // { name : 'hoge' } & { friend: { name: 'fuga' }}
  type T3 = DeepPick<obj, 'name' | 'friend.name' |  'friend.family.name'>  // { name : 'hoge' } &  { friend: { name: 'fuga' }} & { friend: { family: { name: 'baz' }}}

  ```

  > GitHub에서 보기: https://tsch.js.org/956/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type UnionToIntersection<T> = (T extends T
  ? (args: T) => void
  : never
) extends (args: infer R) => void ? R : never

type DeepPick<T, S extends string> = UnionToIntersection<S extends S
  ? S extends `${infer First}.${infer Rest}`
    ? First extends keyof T
      ? { [K in First]: DeepPick<T[First], Rest> }
      : never
    : S extends keyof T
      ? { [K in S]: T[K] }
      : never
  : never>

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>, { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/956/answer/ko
  > 정답 보기: https://tsch.js.org/956/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
