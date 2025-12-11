import { useQuery } from '@tanstack/react-query'
import type { Dependent } from '@/types/medication'
import { dependentService } from './dependents.service'

// Query Keys
const DEPENDENTS_KEYS = {
  all: ['dependents'] as const,
  list: () => [...DEPENDENTS_KEYS.all, 'list'] as const,
}

/**
 * Get all dependents
 */
export function useDependents() {
  return useQuery<Dependent[]>({
    queryKey: DEPENDENTS_KEYS.list(),
    queryFn: () => dependentService.getDependents(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

