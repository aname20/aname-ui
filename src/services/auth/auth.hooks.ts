import { authService } from '@/services/auth/auth.service'
import type { LoginCredentials, RegisterData, User } from '@/types/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Query Keys
const AUTH_KEYS = {
  all: ['auth'] as const,
  currentUser: () => [...AUTH_KEYS.all, 'currentUser'] as const,
}

/**
 * Get current user
 */
export function useCurrentUser(enabled = true) {
  return useQuery({
    queryKey: AUTH_KEYS.currentUser(),
    queryFn: () => authService.getCurrentUser(),
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Login
 */
export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.currentUser() })
    },
    onError: (error) => {
      console.error('Error logging in:', error)
    },
  })
}

/**
 * Register
 */
export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.currentUser() })
    },
    onError: (error) => {
      console.error('Error registering:', error)
    },
  })
}

/**
 * Logout
 */
export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear() // Clear all cache on logout
    },
    onError: (error) => {
      console.error('Error logging out:', error)
    },
  })
}

/**
 * Update profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<User>) => authService.updateProfile(data),
    onMutate: async (data) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: AUTH_KEYS.currentUser() })

      // Snapshot previous value
      const previousUser = queryClient.getQueryData<User>(AUTH_KEYS.currentUser())

      // Optimistically update
      if (previousUser) {
        queryClient.setQueryData<User>(AUTH_KEYS.currentUser(), {
          ...previousUser,
          ...data,
        })
      }

      return { previousUser }
    },
    onError: (error, data, context) => {
      // Rollback on error
      if (context?.previousUser) {
        queryClient.setQueryData(AUTH_KEYS.currentUser(), context.previousUser)
      }
      console.error('Error updating profile:', error)
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.currentUser() })
    },
  })
}

/**
 * Change password
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) =>
      authService.changePassword(oldPassword, newPassword),
    onError: (error) => {
      console.error('Error changing password:', error)
    },
  })
}

