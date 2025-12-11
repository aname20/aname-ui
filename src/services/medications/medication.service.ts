import type { Medication, Prescription } from '@/types/medication'
import { BaseService } from '../api/base.service'

class MedicationService extends BaseService {
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

  async createPrescription(prescription: Prescription): Promise<Prescription> {
    return this.post<Prescription>('/', prescription)
  }

  async getMedications(): Promise<Medication[]> {
    return this.get<Medication[]>('/')
  }

};

export const medicationService = new MedicationService()