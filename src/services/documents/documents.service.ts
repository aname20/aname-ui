import type {
  CreateDocumentDto,
  DeleteResponse,
  Document,
  UpdateDocumentDto,
} from '@/types/document'
import { BaseService } from '../api/base.service'

class DocumentService extends BaseService {
  constructor() {
    super('/documents')
  }

  async getDocuments(dependentId?: string): Promise<Document[]> {
    const params = dependentId ? { dependentId } : undefined
    return this.get<Document[]>('/', { params })
  }

  async getDocumentById(id: number): Promise<Document> {
    return this.get<Document>(`/${id}`)
  }

  async createDocument(data: CreateDocumentDto): Promise<Document> {
    return this.post<Document>('/', data)
  }

  async updateDocument(id: number, data: UpdateDocumentDto): Promise<Document> {
    return this.patch<Document>(`/${id}`, data)
  }

  async deleteDocument(id: number): Promise<DeleteResponse> {
    return this.delete<DeleteResponse>(`/${id}`)
  }
}

export const documentService = new DocumentService()

