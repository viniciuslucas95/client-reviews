export type ClientTableContentItem = {
    id: number
    name: string
    contactName: string
    date: string
    cnpj?: string
}

export type CreateClientDto = {
    name: string
    contactName: string
    date: string
    cnpj?: string
}
