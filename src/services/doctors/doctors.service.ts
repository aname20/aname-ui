import type { Doctor } from '@/types/event'
import { BaseService } from '../api/base.service'

class DoctorsService extends BaseService {
  constructor() {
    super('/doctors')
  }

  async findAll(): Promise<Doctor[]> {
    return this.get<Doctor[]>('')
  }

  async findOne(id: number): Promise<Doctor> {
    return this.get<Doctor>(`/${id}`)
  }

  async search(query: string): Promise<Doctor[]> {
    const params = new URLSearchParams()
    if (query) {
      params.append('search', query)
    }
    const queryString = params.toString()
    const endpoint = queryString ? `?${queryString}` : ''
    return this.get<Doctor[]>(endpoint)
  }
}

export const doctorsService = new DoctorsService()
