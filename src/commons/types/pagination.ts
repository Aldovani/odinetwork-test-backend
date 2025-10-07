export type PaginationProps = {
  page: number
  perPage: number
}

export type PaginationMetadataProps = {
  currentPage: number
  perPage: number
  totalOfItems: number
  totalOfPages: number
}

export type ServicePaginationResponse<T> = {
  metadata: PaginationMetadataProps
  data: T
}
