/*
  462 - Currying 2
  -------
  by Kim (@hubvue) #매우 어려움

  ### 질문

  [Currying](https://en.wikipedia.org/wiki/Currying) is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.

  But in our daily life, currying dynamic arguments is also commonly used, for example, the `Function.bind(this, [...params])` API.

  ```ts
  const func = (a: number, b: number, c: number) => {
    return a + b + c
  }

  const bindFunc = func(null, 1, 2)

  const result = bindFunc(3) // result: 6
  ```

  Thus, based on `Currying 1`, we would need to have the dynamic argument version:

  ```ts
  const add = (a: number, b: number, c: number) => a + b + c
  const three = add(1, 1, 1)

  const curriedAdd = DynamicParamsCurrying(add)
  const six = curriedAdd(1, 2, 3)
  const seven = curriedAdd(1, 2)(4)
  const nine = curriedAdd(2)(3)(4)
  ```

  In this challenge, `DynamicParamsCurrying` may take a function with zero to multiple arguments, you need to correctly type it. The returned function may accept at least one argument. When all the arguments as satisfied, it should yield the return type of the original function correctly.

  > GitHub에서 보기: https://tsch.js.org/462/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// Extract elements from array T excluding elements from array U.
type RestParemeters<T extends any[], U extends any[]> =
  T extends [...U, ...infer R] ? R : never

type Currying<
  T extends (...args: any[]) => any,
  P extends any[] = Parameters<T>,
> = P['length'] extends 0
  ? ReturnType<T>
  : <S extends any[]>(...args: S) => Currying<(...args: RestParemeters<P, S>) => ReturnType<T>>

declare function DynamicParamsCurrying<T extends (...args: any[]) => any>(fn: T): Currying<T>

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const curried1 = DynamicParamsCurrying((a: string, b: number, c: boolean) => true)
const curried2 = DynamicParamsCurrying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)

const curried1Return1 = curried1('123')(123)(true)
const curried1Return2 = curried1('123', 123)(false)
const curried1Return3 = curried1('123', 123, true)

const curried2Return1 = curried2('123')(123)(true)(false)(true)('123')(false)
const curried2Return2 = curried2('123', 123)(true, false)(true, '123')(false)
const curried2Return3 = curried2('123', 123)(true)(false)(true, '123', false)
const curried2Return4 = curried2('123', 123, true)(false, true, '123')(false)
const curried2Return5 = curried2('123', 123, true)(false)(true)('123')(false)
const curried2Return6 = curried2('123', 123, true, false)(true, '123', false)
const curried2Return7 = curried2('123', 123, true, false, true)('123', false)
const curried2Return8 = curried2('123', 123, true, false, true)('123')(false)
const curried2Return9 = curried2('123', 123, true, false, true, '123')(false)
const curried2Return10 = curried2('123', 123, true, false, true, '123', false)

type cases = [
  Expect<Equal< typeof curried1Return1, boolean>>,
  Expect<Equal< typeof curried1Return2, boolean>>,
  Expect<Equal< typeof curried1Return3, boolean>>,

  Expect<Equal< typeof curried2Return1, boolean>>,
  Expect<Equal< typeof curried2Return2, boolean>>,
  Expect<Equal< typeof curried2Return3, boolean>>,
  Expect<Equal< typeof curried2Return4, boolean>>,
  Expect<Equal< typeof curried2Return5, boolean>>,
  Expect<Equal< typeof curried2Return6, boolean>>,
  Expect<Equal< typeof curried2Return7, boolean>>,
  Expect<Equal< typeof curried2Return8, boolean>>,
  Expect<Equal< typeof curried2Return9, boolean>>,
  Expect<Equal< typeof curried2Return10, boolean>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/462/answer/ko
  > 정답 보기: https://tsch.js.org/462/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
