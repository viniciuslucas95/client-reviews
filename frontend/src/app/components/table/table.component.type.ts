export type TableButtonsColumn = {
    class: string,
    iconClass: string,
    onClick: () => void
}

type TableColumn = {id: string} | Record<string, string | TableButtonsColumn>

export type TableContent<T extends TableColumn> = {
    total: number,
    items: T[]
    columns: { key:keyof T, name: string }[]
}
