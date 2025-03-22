import { pipe, withParams } from "./utils"

describe('utils', () => {
    const multiplyByTwo = (value: number) => value * 2
    const divideBy10 = (value: number) => value / 10

    it.each([
        { functions: [multiplyByTwo], expected: 20 },
        { functions: [multiplyByTwo, multiplyByTwo], expected: 40 },
        { functions: [multiplyByTwo, divideBy10], expected: 2 }
    ])('should update value to $expected acording to functions', ({ functions, expected: expectedValue }) => {
        const value: number = pipe(10,
            ...functions,
        )
        expect(value).toBe(expectedValue)
    })
    it.each([
        {
            functionWithParams: divideBy10,
            params: [] as const,
            expected: 1
        },
        {
            functionWithParams: (value: number, add: number) => value + add,
            params: [10] as const,
            expected: 20
        },
        {
            functionWithParams: (value: number, add: number, add2: number) => value + add + add2,
            params: [10, 22] as const,
            expected: 42
        },
    ])('should wrapp function with $params.length addition parameters', ({ functionWithParams, params, expected }) => {
        const wrapped = withParams(functionWithParams, ...params)

        expect(wrapped(10)).toBe(expected)
    })
    it('should work with multi param functions', () => {
        const withTwoParams = (value: number, add: string) => value + Number.parseInt(add)
        const value: number = pipe(10,
            (value) => value * 2,
            withParams(withTwoParams, '12')
        )

        expect(value).toBe(32)
    })
})
