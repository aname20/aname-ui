// Example entity types

export interface Example {
  id: string
  name: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface CreateExampleDTO {
  name: string
  status?: 'active' | 'inactive'
}

export interface UpdateExampleDTO {
  name?: string
  status?: 'active' | 'inactive'
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    perPage: number
    totalPages: number
  }
}

export interface ExampleFilters {
  status?: 'active' | 'inactive'
  page?: number
  perPage?: number
}

