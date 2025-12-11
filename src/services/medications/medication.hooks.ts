import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Prescription } from '@/types/medication'
import { medicationService } from './medication.service'
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
    queryFn: () => medicationService.getPrescriptions(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Get prescription by ID
 */
export function usePrescription(id: number | string, enabled = true) {
  return useQuery({
    queryKey: PRESCRIPTIONS_KEYS.detail(id),
    queryFn: () => medicationService.getPrescriptionDetails(String(id)),
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
    mutationFn: (prescription: Omit<Prescription, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted'>) =>
      medicationService.createPrescription(prescription as Prescription),
    onSuccess: () => {
      // Invalidate prescriptions list to refetch
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
    mutationFn: (prescriptionId: string) => medicationService.removePrescription(prescriptionId),
    onSuccess: () => {
      // Invalidate prescriptions list to refetch
      queryClient.invalidateQueries({ queryKey: PRESCRIPTIONS_KEYS.lists() })
    },
  })
}

/**
 * Helper function to convert form data to Prescription
 */
export function mapFormDataToPrescription(formData: {
  medication: string
  dependent: string
  doctor: string
  dosage: string
  dateUntil?: string
  continuousUse: boolean
  times: string[]
  comments?: string
}): Omit<Prescription, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'dependent' | 'medication' | 'medicationLogs' | 'schedules'> & {
  schedules?: Array<{ time: string }>
} {
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
    medicationId: 0, // TODO: This should be resolved from medication name or provided by the API
    dosage: formData.dosage,
    doctorName: formData.doctor,
    notes: formData.comments,
    startDate: new Date().toISOString(), // Use current date as start date
    endDate,
    type: formData.continuousUse ? 'CONTINUOUS' : 'INTERMITTENT',
    schedules,
  }
}

