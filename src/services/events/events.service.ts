import type { Event, CreateEventDto, UpdateEventDto } from '@/types/event'
import { BaseService } from '../api/base.service'

interface FindAllFilters {
  dependentId?: string
}

class EventsService extends BaseService {
  constructor() {
    super('/events')
  }

  async findAll(filters?: FindAllFilters): Promise<Event[]> {
    const params = new URLSearchParams()
    
    if (filters?.dependentId) {
      params.append('dependentId', filters.dependentId)
    }

    const queryString = params.toString()
    const endpoint = queryString ? `?${queryString}` : ''
    
    return this.get<Event[]>(endpoint)
  }

  async findOne(id: number): Promise<Event> {
    return this.get<Event>(`/${id}`)
  }

  async create(data: CreateEventDto): Promise<Event> {
    return this.post<Event>('', data)
  }

  async update(id: number, data: UpdateEventDto): Promise<Event> {
    return this.patch<Event>(`/${id}`, data)
  }

  async remove(id: number): Promise<void> {
    await this.delete<void>(`/${id}`)
  }
}

export const eventsService = new EventsService()
