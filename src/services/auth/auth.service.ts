import type { AuthTokens, LoginCredentials, RegisterData, User } from '@/types/auth'
import { BaseService } from '../api/base.service'

interface LoginResponse {
  user: User
  accessToken: string
}

interface SignupResponse {
  user: User
  accessToken: string
}

class AuthService extends BaseService {
  constructor() {
    super('/auth')
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return this.post<LoginResponse>('/login', credentials)
  }

  async signup(data: RegisterData): Promise<SignupResponse> {
    return this.post<SignupResponse>('/signup', data)
  }

  async logout(): Promise<void> {
    return this.post<void>('/logout')
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    return this.post<AuthTokens>('/refresh', { refreshToken })
  }

  async getCurrentUser(): Promise<User> {
    return this.get<User>('/me')
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return this.put<User>('/profile', data)
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    return this.post<void>('/change-password', { oldPassword, newPassword })
  }

  async resetPasswordRequest(email: string): Promise<void> {
    return this.post<void>('/reset-password', { email })
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    return this.post<void>('/reset-password/confirm', { token, newPassword })
  }
}

export const authService = new AuthService()
