export type UserRole = 'CAREGIVER' | 'FAMILY'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: UserRole
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
  role: UserRole
}

export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
}
