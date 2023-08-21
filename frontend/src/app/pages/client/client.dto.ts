export type ClientTableContentItem = {
    name: string
    contactName: string
    date: string
    cnpj?: string
    score?: string
}

export type PaginatedClientDto = {
    id: number
    name: string
    contactName: string
    date: string
    cnpj?: string
    score?: number
}

export type CreateClientDto = {
    name: string
    contactName: string
    date: string
    cnpj?: string
}
