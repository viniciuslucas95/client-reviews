type PaginatedDto<T> = {
    count: number,
    items: T[]
}

export default PaginatedDto
