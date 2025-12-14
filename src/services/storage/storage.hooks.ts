import { useMutation } from '@tanstack/react-query'
import { storageService } from './storage.service'

export function useUploadFile() {
  return useMutation({
    mutationFn: (file: File) => storageService.upload(file),
  })
}

