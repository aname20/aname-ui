import { BaseService } from '../api/base.service'

class AgendaService extends BaseService {
  constructor() {
    super('/events')
  }

  async getAllEvents(): Promise<Event[]> {
    return this.get<Event[]>('/')
  }

  async getEventById(id: string): Promise<Event> {
    return this.get<Event>(`/${id}`)
  }

  async createEvent(event: Event): Promise<Event> {
    return this.post<Event>('/', event)
  }

  async updateEvent(id: string, event: Event): Promise<Event> {
    return this.put<Event>(`/${id}`, event)
  }

  async deleteEvent(id: string): Promise<void> {
    return this.delete<void>(`/${id}`)
  }
}

export const agendaService = new AgendaService()

