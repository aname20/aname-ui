import type { LoginCredentials, RegisterData, User } from '@/types/auth'
import { authService } from '@/services/auth/auth.service'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  updateUser: (data: Partial<User>) => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true })
        try {
          const { user, accessToken } = await authService.login(credentials)

          localStorage.setItem('auth_token', accessToken)

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true })
        try {
          const { user, accessToken } = await authService.signup(data)

          localStorage.setItem('auth_token', accessToken)

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: async () => {
        try {
          await authService.logout()
        } catch (error) {
          console.error('Erro ao fazer logout:', error)
        } finally {
          localStorage.removeItem('auth_token')
          set({ user: null, isAuthenticated: false })
        }
      },

      updateUser: async (data: Partial<User>) => {
        try {
          const updatedUser = await authService.updateProfile(data)
          set({ user: updatedUser })
        } catch (error) {
          const currentUser = get().user

          if (currentUser) {
            const updatedUser = { ...currentUser, ...data }
            set({ user: updatedUser })
          }
          throw error
        }
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
)
