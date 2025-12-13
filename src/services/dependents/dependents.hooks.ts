import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Caregiver, CreateDependentDto, Dependent, UpdateDependentDto } from '@/types/medication'
import { dependentService } from './dependents.service'

export const DEPENDENTS_KEYS = {
  all: ['dependents'] as const,
  list: () => [...DEPENDENTS_KEYS.all, 'list'] as const,
  detail: (id: string) => [...DEPENDENTS_KEYS.all, 'detail', id] as const,
  caregivers: (id: string) => [...DEPENDENTS_KEYS.all, 'caregivers', id] as const,
}


export function useDependents() {
  return useQuery<Dependent[]>({
    queryKey: DEPENDENTS_KEYS.list(),
    queryFn: () => dependentService.getDependents(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useDependentById(id: string) {
  return useQuery<Dependent>({
    queryKey: DEPENDENTS_KEYS.detail(id),
    queryFn: () => dependentService.getDependentById(id),
    enabled: !!id,
  })
}

export function useCreateDependent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateDependentDto) => dependentService.createDependent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEPENDENTS_KEYS.list() })
    },
  })
}

export function useUpdateDependent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDependentDto }) =>
      dependentService.updateDependent(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: DEPENDENTS_KEYS.list() })
      queryClient.invalidateQueries({ queryKey: DEPENDENTS_KEYS.detail(variables.id) })
    },
  })
}

export function useDeleteDependent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => dependentService.deleteDependent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEPENDENTS_KEYS.list() })
    },
  })
}

export function useDependentCaregivers(dependentId: string) {
  return useQuery<Caregiver[]>({
    queryKey: DEPENDENTS_KEYS.caregivers(dependentId),
    queryFn: () => dependentService.getCaregivers(dependentId),
    enabled: !!dependentId,
  })
}

export function useAddCaregiver() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ dependentId, email }: { dependentId: string; email: string }) =>
      dependentService.addCaregiver(dependentId, email),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: DEPENDENTS_KEYS.detail(variables.dependentId) })
      queryClient.invalidateQueries({ queryKey: DEPENDENTS_KEYS.caregivers(variables.dependentId) })
    },
  })
}

export function useRemoveCaregiver() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ dependentId, caregiverId }: { dependentId: string; caregiverId: string }) =>
      dependentService.removeCaregiver(dependentId, caregiverId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: DEPENDENTS_KEYS.detail(variables.dependentId) })
      queryClient.invalidateQueries({ queryKey: DEPENDENTS_KEYS.caregivers(variables.dependentId) })
    },
  })
}

