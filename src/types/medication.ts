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

export interface Caregiver {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
}

export interface EmergencyContact {
  id?: number
  name: string
  phone: string
  kinship?: string
}

export interface Dependent {
  id: string
  name: string
  age: number
  susCode?: string | null
  conditions: string[]
  allergies: string[]
  caregivers?: Caregiver[]
  familyMembers?: Caregiver[]
  emergencyContacts?: EmergencyContact[]
  events?: unknown[]
  documents?: unknown[]
  createdAt: string
  updatedAt?: string
}

export interface CreateDependentDto {
  name: string
  age: number
  susCode?: string
  conditions?: string[]
  allergies?: string[]
  caregiverIds?: string[]
  emergencyContacts?: Omit<EmergencyContact, 'id'>[]
}

export interface UpdateDependentDto {
  name?: string
  age?: number
  susCode?: string
  conditions?: string[]
  allergies?: string[]
  caregiverIds?: string[]
  emergencyContacts?: Omit<EmergencyContact, 'id'>[]
}