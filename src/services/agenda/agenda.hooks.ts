import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { agendaService, type AgendaEvent } from './agenda.service'

export const CALENDAR_KEYS = {
  all: ['calendar'] as const,
  list: () => [...CALENDAR_KEYS.all, 'list'] as const,
  detail: (id: string) => [...CALENDAR_KEYS.all, 'detail', id] as const,
}

export function useCalendarEvents() {
  return useQuery({
    queryKey: CALENDAR_KEYS.list(),
    queryFn: () => agendaService.getAllEvents(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useEvent(id: string | undefined) {
  return useQuery<AgendaEvent>({
    queryKey: CALENDAR_KEYS.detail(id || ''),
    queryFn: () => agendaService.getEventById(id || ''),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useCreateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (event: Partial<AgendaEvent>) => agendaService.createEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CALENDAR_KEYS.list() })
    },
  })
}

