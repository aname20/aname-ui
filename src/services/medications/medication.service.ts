import type { Medication } from '@/types/medication'
import { BaseService } from '../api/base.service'

class MedicationService extends BaseService {
  constructor() {
    super('/medications')
  }

  async getMedications(): Promise<Medication[]> {
    return this.get<Medication[]>('/')
  }
}

export const medicationService = new MedicationService()
