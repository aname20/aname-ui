import type {
  CreateExampleDTO,
  Example,
  ExampleFilters,
  PaginatedResponse,
  UpdateExampleDTO,
} from '@/types/example'
import { BaseService } from '../api/base.service'

class ExampleService extends BaseService {
  constructor() {
    super('/examples')
  }

  /**
   * Get all examples (paginated)
   */
  async getAll(filters?: ExampleFilters): Promise<PaginatedResponse<Example>> {
    const params = new URLSearchParams()

    if (filters?.status) params.append('status', filters.status)
    if (filters?.page) params.append('page', filters.page.toString())
    if (filters?.perPage) params.append('perPage', filters.perPage.toString())

    const query = params.toString()
    const endpoint = query ? `/?${query}` : '/'

    return this.get<PaginatedResponse<Example>>(endpoint)
  }

  /**
   * Get example by ID
   */
  async getById(id: string): Promise<Example> {
    return this.get<Example>(`/${id}`)
  }

  /**
   * Create new example
   */
  async create(data: CreateExampleDTO): Promise<Example> {
    return this.post<Example>('/', data)
  }

  /**
   * Update existing example
   */
  async update(id: string, data: UpdateExampleDTO): Promise<Example> {
    return this.patch<Example>(`/${id}`, data)
  }

  /**
   * Delete example
   */
  async remove(id: string): Promise<void> {
    return this.delete<void>(`/${id}`)
  }

  /**
   * Bulk operations
   */
  async bulkDelete(ids: string[]): Promise<void> {
    return this.post<void>('/bulk-delete', { ids })
  }

  async bulkUpdate(ids: string[], data: UpdateExampleDTO): Promise<Example[]> {
    return this.post<Example[]>('/bulk-update', { ids, data })
  }
}

export const exampleService = new ExampleService()

