import type { Caregiver } from '@/types/medication'
import { BaseService } from '../api/base.service'

class CaregiversService extends BaseService {
  constructor() {
    super('/users')
  }

  async getAllCaregivers(): Promise<Caregiver[]> {
    return this.get<Caregiver[]>('/', { params: { role: 'CAREGIVER' } })
  }
}

export const caregiversService = new CaregiversService()

