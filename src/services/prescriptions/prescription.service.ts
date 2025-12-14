import type { Medication, Prescription } from '@/types/medication'
import { BaseService } from '../api/base.service'

// DTOs para criação e atualização
export interface CreatePrescriptionDTO {
  dependentId: string
  medicationId: number
  dosage?: string
  doctorName?: string
  doctorCrm?: string
  notes?: string
  startDate: string
  endDate?: string
  type: 'CONTINUOUS' | 'INTERMITTENT'
  schedules: Array<{ time: string }>
}

export interface UpdatePrescriptionDTO {
  dependentId?: string
  medicationId?: number
  dosage?: string
  doctorName?: string
  doctorCrm?: string
  notes?: string
  startDate?: string
  endDate?: string
  type?: 'CONTINUOUS' | 'INTERMITTENT'
  schedules?: Array<{ time: string }>
}

class PrescriptionService extends BaseService {
  constructor() {
    super('/prescriptions')
  }

  async removePrescription(prescriptionId: string): Promise<boolean> {
    return this.delete<boolean>(`/${prescriptionId}`)
  }

  async getPrescriptions(): Promise<Prescription[]> {
    return this.get<Prescription[]>('/')
  }

  async getPrescriptionDetails(prescriptionId: string): Promise<Prescription> {
    return this.get<Prescription>(`/${prescriptionId}`)
  }

  async createPrescription(data: CreatePrescriptionDTO): Promise<Prescription> {
    return this.post<Prescription>('/', data)
  }

  async updatePrescription(prescriptionId: string, data: UpdatePrescriptionDTO): Promise<Prescription> {
    return this.patch<Prescription>(`/${prescriptionId}`, data)
  }

  async getMedications(): Promise<Medication[]> {
    // Assuming medications are at /medications endpoint
    // Adjust the endpoint if your API structure is different
    return this.get<Medication[]>('/medications')
  }
}

export const prescriptionService = new PrescriptionService()
