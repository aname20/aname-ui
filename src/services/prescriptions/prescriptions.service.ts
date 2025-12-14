import type { Prescription } from '@/types/medication'
import { BaseService } from '../api/base.service'

interface FindAllFilters {
  dependentId?: string
  date?: string
}

class PrescriptionsService extends BaseService {
  constructor() {
    super('/prescriptions')
  }

  async findAll(filters?: FindAllFilters): Promise<Prescription[]> {
    const params = new URLSearchParams()
    
    if (filters?.dependentId) {
      params.append('dependentId', filters.dependentId)
    }
    
    if (filters?.date) {
      params.append('date', filters.date)
    }

    const queryString = params.toString()
    const endpoint = queryString ? `?${queryString}` : ''
    
    return this.get<Prescription[]>(endpoint)
  }

  async findOne(id: number): Promise<Prescription> {
    return this.get<Prescription>(`/${id}`)
  }

  async create(data: any): Promise<Prescription> {
    return this.post<Prescription>('', data)
  }

  async update(id: number, data: any): Promise<Prescription> {
    return this.put<Prescription>(`/${id}`, data)
  }

  async remove(id: number): Promise<boolean> {
    await this.delete<void>(`/${id}`)
    return true
  }

  async createMedicationLog(prescriptionId: number, data: any): Promise<any> {
    return this.post<any>(`/${prescriptionId}/log`, data)
  }
}

export const prescriptionsService = new PrescriptionsService()
