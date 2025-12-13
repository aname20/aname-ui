import type { UploadResponse } from '@/types/document'
import { api } from '../api/axios'

class StorageService {
  private baseURL = '/storage'

  async upload(file: File): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await api.post<UploadResponse>(
      `${this.baseURL}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return response.data
  }
}

export const storageService = new StorageService()

