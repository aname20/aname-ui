import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { prescriptionService } from './prescription.service'
import moment from 'moment'

// Query Keys
const PRESCRIPTIONS_KEYS = {
  all: ['prescriptions'] as const,
  lists: () => [...PRESCRIPTIONS_KEYS.all, 'list'] as const,
  list: () => [...PRESCRIPTIONS_KEYS.lists()] as const,
  details: () => [...PRESCRIPTIONS_KEYS.all, 'detail'] as const,
  detail: (id: number | string) => [...PRESCRIPTIONS_KEYS.details(), id] as const,
}

/**
 * Get all prescriptions
 */
export function usePrescriptions() {
  return useQuery({
    queryKey: PRESCRIPTIONS_KEYS.list(),
    queryFn: () => prescriptionService.getPrescriptions(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Get prescription by ID
 */
export function usePrescription(id: number | string, enabled = true) {
  return useQuery({
    queryKey: PRESCRIPTIONS_KEYS.detail(id),
    queryFn: () => prescriptionService.getPrescriptionDetails(String(id)),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Create prescription
 */
export function useCreatePrescription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Parameters<typeof mapFormDataToPrescription>[0]) => {
      const prescriptionData = mapFormDataToPrescription(data)
      return prescriptionService.createPrescription(prescriptionData)
    },
    onSuccess: () => {
      // Invalidate prescriptions list to refetch
      queryClient.invalidateQueries({ queryKey: PRESCRIPTIONS_KEYS.lists() })
    },
  })
}

/**
 * Update prescription
 */
export function useUpdatePrescription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof mapFormDataToPrescription>[0] }) => {
      const prescriptionData = mapFormDataToPrescription(data)
      return prescriptionService.updatePrescription(id, prescriptionData)
    },
    onSuccess: (_, variables) => {
      // Invalidate both the detail and list queries
      queryClient.invalidateQueries({ queryKey: PRESCRIPTIONS_KEYS.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: PRESCRIPTIONS_KEYS.lists() })
    },
  })
}

/**
 * Delete prescription
 */
export function useDeletePrescription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (prescriptionId: string) => prescriptionService.removePrescription(prescriptionId),
    onSuccess: () => {
      // Invalidate prescriptions list to refetch
      queryClient.invalidateQueries({ queryKey: PRESCRIPTIONS_KEYS.lists() })
    },
  })
}

/**
 * Helper function to convert form data to Prescription DTO
 */
export function mapFormDataToPrescription(formData: {
  medicationId: number
  dependent: string
  doctor: string
  dosage: string
  dateUntil?: string
  continuousUse: boolean
  times: string[]
  comments?: string
}): import('./prescription.service').CreatePrescriptionDTO {
  // Convert schedules - only send time field for creation
  const schedules = formData.times.map((time) => ({
    time,
  }))

  // Convert dateUntil from DD/MM/YYYY to ISO string
  let endDate: string | undefined
  if (formData.dateUntil && !formData.continuousUse) {
    const momentDate = moment(formData.dateUntil, 'DD/MM/YYYY', true)
    if (momentDate.isValid()) {
      endDate = momentDate.toISOString()
    }
  }

  return {
    dependentId: formData.dependent,
    medicationId: formData.medicationId,
    dosage: formData.dosage,
    doctorName: formData.doctor,
    notes: formData.comments,
    startDate: new Date().toISOString(), // Use current date as start date
    endDate,
    type: formData.continuousUse ? 'CONTINUOUS' : 'INTERMITTENT',
    schedules,
  }
}

