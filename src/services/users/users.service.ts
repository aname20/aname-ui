import type { User } from '@/types/auth'
import { BaseService } from '../api/base.service'

class UsersService extends BaseService {
  constructor() {
    super('/users')
  }

  async getUserById(id: string): Promise<User> {
    return this.get<User>(`/${id}`)
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.patch<User>(`/${id}`, data)
  }
}

export const usersService = new UsersService()

