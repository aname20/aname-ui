export interface Event {
  id: number
  title: string
  description?: string
  date: string
  status: EventStatus
  location?: string
  diagnosis?: string
  dependentId: string
  doctorName: string
  doctorCrm?: string
  createdAt: string
  updatedAt: string
  dependent?: {
    name: string
    age?: number
  }
}

export type EventStatus = 'SCHEDULED' | 'DONE' | 'CANCELED'

export interface Doctor {
  id: number
  name: string
  specialty: string
  createdAt: string
  updatedAt: string
}

export interface CreateEventDto {
  title: string
  description?: string
  date: string
  location?: string
  diagnosis?: string
  dependentId: string
  doctorName: string
  doctorCrm?: string
}

export interface UpdateEventDto {
  title?: string
  description?: string
  date?: string
  status?: EventStatus
  location?: string
  diagnosis?: string
  dependentId?: string
  doctorName?: string
  doctorCrm?: string
}
