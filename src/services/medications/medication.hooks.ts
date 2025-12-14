import { useQuery } from '@tanstack/react-query'
import { medicationService } from './medication.service'

// Query Keys
const MEDICATIONS_KEYS = {
  all: ['medications'] as const,
  lists: () => [...MEDICATIONS_KEYS.all, 'list'] as const,
  list: () => [...MEDICATIONS_KEYS.lists()] as const,
  details: () => [...MEDICATIONS_KEYS.all, 'detail'] as const,
  detail: (id: number | string) => [...MEDICATIONS_KEYS.details(), id] as const,
}

/**
 * Get all medications
 */
export function useMedications() {
  return useQuery({
    queryKey: MEDICATIONS_KEYS.list(),
    queryFn: () => medicationService.getMedications(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
