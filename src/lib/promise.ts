export function promiseWithResolver<T>(): [
	Promise<T>,
	(value: T) => void,
	(error: unknown) => void
] {
	let resolve: (object: T) => void;
	let reject: (error: unknown) => void;
	const promise = new Promise<T>((res, rej) => ((resolve = res), (reject = rej)));

	return [promise, resolve!, reject!];
}
