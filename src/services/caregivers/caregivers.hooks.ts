import { useQuery } from '@tanstack/react-query'
import type { Caregiver } from '@/types/medication'
import { caregiversService } from './caregivers.service'

export const CAREGIVERS_KEYS = {
  all: ['caregivers'] as const,
  list: () => [...CAREGIVERS_KEYS.all, 'list'] as const,
}

export function useAvailableCaregivers() {
  return useQuery<Caregiver[]>({
    queryKey: CAREGIVERS_KEYS.list(),
    queryFn: () => caregiversService.getAllCaregivers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

