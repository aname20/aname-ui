import { DocumentType } from '@/pages/Documents/types/DocumentType'

export interface DocumentDependent {
  id: string
  name: string
}

export interface Document {
  id: number
  title: string
  type: DocumentType
  date: string
  fileUrl: string
  comments?: string | null
  createdAt: string
  updatedAt: string
  dependent: DocumentDependent
}

export interface CreateDocumentDto {
  dependentId: string
  title: string
  type: DocumentType
  date: string
  fileUrl: string
  comments?: string
}

export interface UpdateDocumentDto {
  title?: string
  type?: DocumentType
  date?: string
  fileUrl?: string
  comments?: string
}

export interface UploadResponse {
  url: string
  key: string
}

export interface DeleteResponse {
  message: string
}

