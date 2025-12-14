import type { User } from '@/types/auth'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usersService } from './users.service'

export const USERS_KEYS = {
  all: ['users'] as const,
  detail: (id: string) => [...USERS_KEYS.all, 'detail', id] as const,
}

export function useUserById(id: string) {
  return useQuery<User>({
    queryKey: USERS_KEYS.detail(id),
    queryFn: () => usersService.getUserById(id),
    enabled: !!id,
  })
}

export function useUpdateUser() {
  return useMutation<User, Error, { id: string; data: Partial<User> }>({
    mutationFn: ({ id, data }) => usersService.updateUser(id, data),
  })
}
