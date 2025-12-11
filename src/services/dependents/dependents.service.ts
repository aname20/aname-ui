import type { Dependent } from '@/types/medication'
import { BaseService } from '../api/base.service'

class DependentService extends BaseService {
  constructor() {
    super('/dependents')
  }

  async getDependents(): Promise<Dependent[]> {
    return this.get<Dependent[]>('/')
  }

};

export const dependentService = new DependentService()