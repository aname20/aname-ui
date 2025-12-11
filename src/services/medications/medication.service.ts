import type { Medication, Prescription } from '@/types/medication'
import { usePrescriptionStore, mockMedications, type PrescriptionFormData } from '@/stores/prescriptionStore'

class MedicationService {
  private getStore() {
    return usePrescriptionStore.getState()
  }

  async removePrescription(prescriptionId: string): Promise<boolean> {
    const id = parseInt(prescriptionId, 10)
    return this.getStore().deletePrescription(id)
  }

  async getPrescriptions(): Promise<Prescription[]> {
    return this.getStore().getPrescriptions()
  }

  async getPrescriptionDetails(prescriptionId: string): Promise<Prescription> {
    const id = parseInt(prescriptionId, 10)
    const prescription = await this.getStore().getPrescriptionById(id)

    if (!prescription) {
      throw new Error('Prescrição não encontrada')
    }

    return prescription
  }

  async createPrescription(data: PrescriptionFormData): Promise<Prescription> {
    return this.getStore().addPrescription(data)
  }

  async updatePrescription(prescriptionId: string, data: PrescriptionFormData): Promise<Prescription> {
    const id = parseInt(prescriptionId, 10)
    return this.getStore().updatePrescription(id, data)
  }

  async getMedications(): Promise<Medication[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockMedications
  }
}

export const medicationService = new MedicationService()
