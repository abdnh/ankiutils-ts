export function promiseWithResolver<T>(): [Promise<T>, (value: T) => void] {
    let resolve: (object: T) => void;
    const promise = new Promise<T>((res) => (resolve = res));

    return [promise, resolve!];
}
