/** @internal */
export class EnsureData<T> {
    ready = false
    data: T = undefined!

    subscribers: Array<() => any> = []
    onDataAvailable(cb: () => void) {}
}

export const filterValues = <K>(
    obj: Record<string, K>,
    filterFn: (key: string, value: K) => boolean,
) => Object.fromEntries(Object.entries(obj).filter(arr => filterFn(...arr)))
