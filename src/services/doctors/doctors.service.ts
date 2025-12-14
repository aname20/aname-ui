import { BaseService } from '../api/base.service'

export interface Doctor {
  id: string
  name: string
  specialty?: string
  createdAt?: string
  updatedAt?: string
}

class DoctorsService extends BaseService {
  constructor() {
    super('/doctors')
  }

  async getDoctors(): Promise<Doctor[]> {
    return this.get<Doctor[]>('/')
  }
}

export const doctorsService = new DoctorsService()

