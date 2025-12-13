import type { Caregiver, CreateDependentDto, Dependent, UpdateDependentDto } from '@/types/medication'
import { BaseService } from '../api/base.service'

class DependentService extends BaseService {
  constructor() {
    super('/dependents')
  }

  async getDependents(): Promise<Dependent[]> {
    return this.get<Dependent[]>('/')
  }

  async getDependentById(id: string): Promise<Dependent> {
    return this.get<Dependent>(`/${id}`)
  }

  async createDependent(data: CreateDependentDto): Promise<Dependent> {
    return this.post<Dependent>('/', data)
  }

  async updateDependent(id: string, data: UpdateDependentDto): Promise<Dependent> {
    return this.patch<Dependent>(`/${id}`, data)
  }

  async deleteDependent(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }

  async addCaregiver(dependentId: string, email: string): Promise<Dependent> {
    return this.post<Dependent>(`/${dependentId}/caregivers`, { email })
  }

  async removeCaregiver(dependentId: string, caregiverId: string): Promise<void> {
    return this.delete(`/${dependentId}/caregivers/${caregiverId}`)
  }

  async getCaregivers(dependentId: string): Promise<Caregiver[]> {
    return this.get<Caregiver[]>(`/${dependentId}/caregivers`)
  }
}

export const dependentService = new DependentService()