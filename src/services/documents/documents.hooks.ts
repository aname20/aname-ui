import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CreateDocumentDto, Document, UpdateDocumentDto } from '@/types/document'
import { documentService } from './documents.service'

export const DOCUMENTS_KEYS = {
  all: ['documents'] as const,
  list: (dependentId?: string) =>
    dependentId
      ? ([...DOCUMENTS_KEYS.all, 'list', dependentId] as const)
      : ([...DOCUMENTS_KEYS.all, 'list'] as const),
  detail: (id: number) => [...DOCUMENTS_KEYS.all, 'detail', id] as const,
}

export function useDocuments(dependentId?: string) {
  return useQuery<Document[]>({
    queryKey: DOCUMENTS_KEYS.list(dependentId),
    queryFn: () => documentService.getDocuments(dependentId),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useDocumentById(id: number) {
  return useQuery<Document>({
    queryKey: DOCUMENTS_KEYS.detail(id),
    queryFn: () => documentService.getDocumentById(id),
    enabled: !!id,
  })
}

export function useCreateDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateDocumentDto) => documentService.createDocument(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DOCUMENTS_KEYS.all })
    },
  })
}

export function useUpdateDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateDocumentDto }) =>
      documentService.updateDocument(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: DOCUMENTS_KEYS.all })
      queryClient.invalidateQueries({ queryKey: DOCUMENTS_KEYS.detail(variables.id) })
    },
  })
}

export function useDeleteDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => documentService.deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DOCUMENTS_KEYS.all })
    },
  })
}
