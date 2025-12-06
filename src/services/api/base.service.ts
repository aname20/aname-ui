import type { AxiosRequestConfig } from 'axios'
import { api } from './axios'

export class BaseService {
  protected baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  protected async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.get<T>(`${this.baseURL}${endpoint}`, config)
    return response.data
  }

  protected async post<T>(
    endpoint: string,
    data?: unknown, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await api.post<T>(`${this.baseURL}${endpoint}`, data, config)
    return response.data
  }

  protected async put<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await api.put<T>(`${this.baseURL}${endpoint}`, data, config)
    return response.data
  }

  protected async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await api.patch<T>(`${this.baseURL}${endpoint}`, data, config)
    return response.data
  }

  protected async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.delete<T>(`${this.baseURL}${endpoint}`, config)
    return response.data
  }
}

