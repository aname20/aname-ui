import type { LoginCredentials, RegisterData, User } from '@/types/auth'
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
          // TODO: Substituir por chamada real à API
          // const { user: userData, tokens } = await authService.login(credentials)

          // Simulação temporária
          const mockUser: User = {
            id: '1',
            name: 'Test User',
            email: credentials.email,
            role: 'caregiver',
          }

          set({
            user: mockUser,
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
          // TODO: Substituir por chamada real à API
          // const { user: userData, tokens } = await authService.register(data)

          // Simulação temporária
          const mockUser: User = {
            id: Date.now().toString(),
            name: data.name,
            email: data.email,
            phone: data.phone,
            role: 'user',
          }

          set({
            user: mockUser,
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
          // TODO: Chamar endpoint de logout da API
          // await authService.logout()
        } catch (error) {
          console.error('Erro ao fazer logout:', error)
        } finally {
          set({ user: null, isAuthenticated: false })
        }
      },

      updateUser: async (data: Partial<User>) => {
        // TODO: Chamar API para atualizar
        // const updatedUser = await authService.updateProfile(data)

        // Simulação temporária
        const currentUser = get().user
        if (currentUser) {
          const updatedUser = { ...currentUser, ...data }
          set({ user: updatedUser })
        }
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
)

