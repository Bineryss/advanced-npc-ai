type PipeFunction<Input, Output> = (value: Input) => Output
type ExcludeFirstParam<T extends (...args: any[]) => any> = T extends (first: any, ...rest: infer R) => any ? R : never;

export function pipe<T>(value: T, ...functions: PipeFunction<T, T>[]): T {
    return functions.reduce((total: T, nextFunction: PipeFunction<T, T>) => nextFunction(total), value)
}

export function withParams<T, F extends (...args: any[]) => T>(callFunction: F, ...params: ExcludeFirstParam<F>): PipeFunction<T, T> {
    return (value: T) => callFunction(value, ...params)
}
