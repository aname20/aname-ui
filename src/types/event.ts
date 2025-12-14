export interface Event {
  id: number
  title: string
  description?: string
  date: string
  status: EventStatus
  location?: string
  dependentId: string
  doctorId?: number
  createdAt: string
  updatedAt: string
  dependent?: {
    name: string
  }
  doctor?: Doctor
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
  dependentId: string
  doctorId?: number
}

export interface UpdateEventDto {
  title?: string
  description?: string
  date?: string
  status?: EventStatus
  location?: string
  dependentId?: string
  doctorId?: number
}
