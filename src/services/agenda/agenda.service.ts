import { BaseService } from '../api/base.service'

export interface AgendaEvent {
  id: string
  title: string
  description?: string
  date: string
  doctor?: string | {
    id: string
    name: string
    specialty?: string
    createdAt?: string
    updatedAt?: string
  }
  location?: string
  comments?: string
  diagnosis?: string
  dependentId?: string
  dependent?: {
    id: string
    name: string
    age?: number
    avatar?: string
  }
  [key: string]: unknown
}

class AgendaService extends BaseService {
  constructor() {
    super('/events')
  }

  async getAllEvents(): Promise<AgendaEvent[]> {
    return this.get<AgendaEvent[]>('/')
  }

  async getEventById(id: string): Promise<AgendaEvent> {
    return this.get<AgendaEvent>(`/${id}`)
  }

  async createEvent(event: Partial<AgendaEvent>): Promise<AgendaEvent> {
    return this.post<AgendaEvent>('/', event)
  }

  async updateEvent(id: string, event: Partial<AgendaEvent>): Promise<AgendaEvent> {
    return this.put<AgendaEvent>(`/${id}`, event)
  }

  async deleteEvent(id: string): Promise<void> {
    return this.delete<void>(`/${id}`)
  }
}

export const agendaService = new AgendaService()

