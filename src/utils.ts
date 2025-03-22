type PipeFunction<Input, Output> = (value: Input) => Output

export function pipe<T>(value: T, ...functions: PipeFunction<T, T>[]): T {
    return functions.reduce((total: T, nextFunction: PipeFunction<T, T>) => nextFunction(total), value)
}

export function withParams<T>(callFunction: Function, ...params: unknown[]): PipeFunction<T, T> {
    return (value: T) => callFunction(value, ...params)
}