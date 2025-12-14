import { useQuery } from '@tanstack/react-query'
import { doctorsService, type Doctor } from './doctors.service'

export const DOCTORS_KEYS = {
  all: ['doctors'] as const,
  list: () => [...DOCTORS_KEYS.all, 'list'] as const,
}

export function useDoctors() {
  return useQuery<Doctor[]>({
    queryKey: DOCTORS_KEYS.list(),
    queryFn: () => doctorsService.getDoctors(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

