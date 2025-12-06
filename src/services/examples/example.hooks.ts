import { exampleService } from '@/services/examples/example.service'
import type {
  CreateExampleDTO,
  Example,
  ExampleFilters,
  UpdateExampleDTO,
} from '@/types/example'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Query Keys
const EXAMPLES_KEYS = {
  all: ['examples'] as const,
  lists: () => [...EXAMPLES_KEYS.all, 'list'] as const,
  list: (filters?: ExampleFilters) => [...EXAMPLES_KEYS.lists(), filters] as const,
  details: () => [...EXAMPLES_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...EXAMPLES_KEYS.details(), id] as const,
}

/**
 * Get all examples (paginated)
 */
export function useExamples(filters?: ExampleFilters) {
  return useQuery({
    queryKey: EXAMPLES_KEYS.list(filters),
    queryFn: () => exampleService.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Get example by ID
 */
export function useExample(id: string, enabled = true) {
  return useQuery({
    queryKey: EXAMPLES_KEYS.detail(id),
    queryFn: () => exampleService.getById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Create example
 */
export function useCreateExample() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateExampleDTO) => exampleService.create(data),
    onSuccess: () => {
      // Invalidate and refetch all lists
      queryClient.invalidateQueries({ queryKey: EXAMPLES_KEYS.lists() })
    },
    onError: (error) => {
      console.error('Error creating example:', error)
    },
  })
}

/**
 * Update example
 */
export function useUpdateExample() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateExampleDTO }) =>
      exampleService.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: EXAMPLES_KEYS.detail(id) })

      // Snapshot previous value
      const previousExample = queryClient.getQueryData<Example>(EXAMPLES_KEYS.detail(id))

      // Optimistically update
      if (previousExample) {
        queryClient.setQueryData<Example>(EXAMPLES_KEYS.detail(id), {
          ...previousExample,
          ...data,
          updatedAt: new Date().toISOString(),
        })
      }

      return { previousExample }
    },
    onError: (error, { id }, context) => {
      // Rollback on error
      if (context?.previousExample) {
        queryClient.setQueryData(EXAMPLES_KEYS.detail(id), context.previousExample)
      }
      console.error('Error updating example:', error)
    },
    onSettled: (data, error, { id }) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: EXAMPLES_KEYS.detail(id) })
      queryClient.invalidateQueries({ queryKey: EXAMPLES_KEYS.lists() })
    },
  })
}

/**
 * Delete example
 */
export function useDeleteExample() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => exampleService.remove(id),
    onMutate: async (id) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: EXAMPLES_KEYS.lists() })

      // Snapshot previous value
      const previousLists = queryClient.getQueriesData({ queryKey: EXAMPLES_KEYS.lists() })

      // Optimistically remove from lists
      queryClient.setQueriesData<{ data: Example[] }>(
        { queryKey: EXAMPLES_KEYS.lists() },
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.filter((example) => example.id !== id),
          }
        }
      )

      return { previousLists }
    },
    onError: (error, id, context) => {
      // Rollback on error
      if (context?.previousLists) {
        context.previousLists.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      console.error('Error deleting example:', error)
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: EXAMPLES_KEYS.lists() })
    },
  })
}

/**
 * Bulk delete examples
 */
export function useBulkDeleteExamples() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ids: string[]) => exampleService.bulkDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXAMPLES_KEYS.lists() })
    },
    onError: (error) => {
      console.error('Error bulk deleting examples:', error)
    },
  })
}

/**
 * Bulk update examples
 */
export function useBulkUpdateExamples() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ ids, data }: { ids: string[]; data: UpdateExampleDTO }) =>
      exampleService.bulkUpdate(ids, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXAMPLES_KEYS.all })
    },
    onError: (error) => {
      console.error('Error bulk updating examples:', error)
    },
  })
}

