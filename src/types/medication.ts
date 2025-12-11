export interface Prescription {
  id: number
  dependentId: string
  medicationId: number
  dosage?: string
  doctorName?: string
  doctorCrm?: string
  notes?: string
  startDate: string
  endDate?: string
  type: PrescriptionType
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  dependent?: Dependent
  medication?: Medication
  schedules?: MedicationSchedule[]
  medicationLogs?: MedicationLog[]
}

export type PrescriptionType = 'CONTINUOUS' | 'INTERMITTENT'

export interface Medication {
  id: number
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface MedicationLog {
  id: number
  prescriptionId: number
  caregiverId: string
  takenAt: string
  status: 'TAKEN' | 'MISSED' | 'REFUSED'
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface MedicationSchedule {
  id: number
  prescriptionId: number
  time: string
  createdAt: string
  updatedAt: string
}

export interface Dependent {
  id: string
  name: string
  age: number
  susCode?: string
  createdAt: string
  updatedAt: string
}