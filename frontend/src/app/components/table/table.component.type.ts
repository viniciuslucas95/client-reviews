export type TableContent<T> = {
    total: number,
    items: T[]
    columns:{ key:keyof T, name: string }[]
}
