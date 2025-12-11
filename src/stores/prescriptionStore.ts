import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Prescription, Dependent, Medication, MedicationSchedule } from '@/types/medication'

// Mock de dependentes disponíveis
export const mockDependents: Dependent[] = [
  {
    id: 'graca-lima',
    name: 'Graça Lima',
    age: 72,
    susCode: '123456789012345',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'joaquim-bezerra',
    name: 'Joaquim Bezerra',
    age: 68,
    susCode: '987654321098765',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'maria-luiz',
    name: 'Maria Luiz da Silva',
    age: 75,
    susCode: '456789123456789',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
]

// Mock de medicamentos disponíveis
export const mockMedications: Medication[] = [
  { id: 1, name: 'Clonazepam', description: 'Ansiolítico', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'Losartana', description: 'Anti-hipertensivo', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 3, name: 'Metformina', description: 'Antidiabético', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 4, name: 'Omeprazol', description: 'Protetor gástrico', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 5, name: 'Atenolol', description: 'Beta-bloqueador', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
]

// Prescrições iniciais mockadas
const initialPrescriptions: Prescription[] = [
  {
    id: 1,
    dependentId: 'graca-lima',
    medicationId: 1,
    dosage: '2mg',
    doctorName: "Dr. Marco Di'Angelo",
    doctorCrm: '123456-SP',
    notes: 'Tomar antes de dormir',
    startDate: '2024-01-01T00:00:00Z',
    endDate: undefined,
    type: 'CONTINUOUS',
    isDeleted: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    dependent: mockDependents[0],
    medication: mockMedications[0],
    schedules: [
      { id: 1, prescriptionId: 1, time: '22:00', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
    ],
  },
  {
    id: 2,
    dependentId: 'joaquim-bezerra',
    medicationId: 2,
    dosage: '50mg',
    doctorName: 'Dra. Ana Paula Santos',
    doctorCrm: '654321-RJ',
    notes: 'Tomar pela manhã em jejum',
    startDate: '2024-02-01T00:00:00Z',
    endDate: undefined,
    type: 'CONTINUOUS',
    isDeleted: false,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
    dependent: mockDependents[1],
    medication: mockMedications[1],
    schedules: [
      { id: 2, prescriptionId: 2, time: '07:00', createdAt: '2024-02-01T00:00:00Z', updatedAt: '2024-02-01T00:00:00Z' },
    ],
  },
  {
    id: 3,
    dependentId: 'maria-luiz',
    medicationId: 3,
    dosage: '850mg',
    doctorName: 'Dr. Carlos Eduardo',
    doctorCrm: '789012-MG',
    notes: 'Tomar após o almoço e jantar',
    startDate: '2024-03-01T00:00:00Z',
    endDate: '2024-12-31T00:00:00Z',
    type: 'INTERMITTENT',
    isDeleted: false,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
    dependent: mockDependents[2],
    medication: mockMedications[2],
    schedules: [
      { id: 3, prescriptionId: 3, time: '12:30', createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-03-01T00:00:00Z' },
      { id: 4, prescriptionId: 3, time: '19:30', createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-03-01T00:00:00Z' },
    ],
  },
]

// Tipo para os dados do formulário
export interface PrescriptionFormData {
  medication: string
  dependent: string
  doctor: string
  dosage: string
  dateUntil?: string
  continuousUse: boolean
  times: string[]
  comments?: string
}

interface PrescriptionStore {
  prescriptions: Prescription[]
  isLoading: boolean

  // Ações
  getPrescriptions: () => Promise<Prescription[]>
  getPrescriptionById: (id: number) => Promise<Prescription | undefined>
  addPrescription: (data: PrescriptionFormData) => Promise<Prescription>
  updatePrescription: (id: number, data: PrescriptionFormData) => Promise<Prescription>
  deletePrescription: (id: number) => Promise<boolean>
}

// Função auxiliar para converter form data em Prescription
const formDataToPrescription = (
  data: PrescriptionFormData,
  existingId?: number
): Omit<Prescription, 'id'> & { id?: number } => {
  const now = new Date().toISOString()

  // Encontra ou cria o medicamento
  let medication = mockMedications.find(
    (m) => m.name.toLowerCase() === data.medication.toLowerCase()
  )

  if (!medication) {
    medication = {
      id: mockMedications.length + 1,
      name: data.medication,
      description: '',
      createdAt: now,
      updatedAt: now,
    }
    mockMedications.push(medication)
  }

  // Encontra o dependente
  const dependent = mockDependents.find((d) => d.id === data.dependent)

  // Converte os horários para schedules
  const schedules: MedicationSchedule[] = data.times.map((time, index) => ({
    id: Date.now() + index,
    prescriptionId: existingId || 0,
    time,
    createdAt: now,
    updatedAt: now,
  }))

  // Converte a data de DD/MM/YYYY para ISO
  let endDate: string | undefined
  if (data.dateUntil && !data.continuousUse) {
    const [day, month, year] = data.dateUntil.split('/')
    endDate = new Date(`${year}-${month}-${day}`).toISOString()
  }

  return {
    id: existingId,
    dependentId: data.dependent,
    medicationId: medication.id,
    dosage: data.dosage,
    doctorName: data.doctor,
    doctorCrm: '',
    notes: data.comments || '',
    startDate: now,
    endDate,
    type: data.continuousUse ? 'CONTINUOUS' : 'INTERMITTENT',
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
    dependent,
    medication,
    schedules,
  }
}

export const usePrescriptionStore = create<PrescriptionStore>()(
  persist(
    (set, get) => ({
      prescriptions: initialPrescriptions,
      isLoading: false,

      getPrescriptions: async () => {
        set({ isLoading: true })

        // Simula delay de rede
        await new Promise((resolve) => setTimeout(resolve, 300))

        const prescriptions = get().prescriptions.filter((p) => !p.isDeleted)
        set({ isLoading: false })

        return prescriptions
      },

      getPrescriptionById: async (id: number) => {
        set({ isLoading: true })

        // Simula delay de rede
        await new Promise((resolve) => setTimeout(resolve, 200))

        const prescription = get().prescriptions.find(
          (p) => p.id === id && !p.isDeleted
        )
        set({ isLoading: false })

        return prescription
      },

      addPrescription: async (data: PrescriptionFormData) => {
        set({ isLoading: true })

        // Simula delay de rede
        await new Promise((resolve) => setTimeout(resolve, 500))

        const currentPrescriptions = get().prescriptions
        const newId = Math.max(...currentPrescriptions.map((p) => p.id), 0) + 1

        const newPrescriptionData = formDataToPrescription(data, newId)
        const newPrescription: Prescription = {
          ...newPrescriptionData,
          id: newId,
          schedules: newPrescriptionData.schedules?.map((s) => ({
            ...s,
            prescriptionId: newId,
          })),
        } as Prescription

        set({
          prescriptions: [...currentPrescriptions, newPrescription],
          isLoading: false,
        })

        return newPrescription
      },

      updatePrescription: async (id: number, data: PrescriptionFormData) => {
        set({ isLoading: true })

        // Simula delay de rede
        await new Promise((resolve) => setTimeout(resolve, 500))

        const currentPrescriptions = get().prescriptions
        const existingIndex = currentPrescriptions.findIndex((p) => p.id === id)

        if (existingIndex === -1) {
          set({ isLoading: false })
          throw new Error('Prescrição não encontrada')
        }

        const existing = currentPrescriptions[existingIndex]
        const updatedData = formDataToPrescription(data, id)

        const updatedPrescription: Prescription = {
          ...existing,
          ...updatedData,
          id,
          createdAt: existing.createdAt,
          updatedAt: new Date().toISOString(),
        } as Prescription

        const updatedPrescriptions = [...currentPrescriptions]
        updatedPrescriptions[existingIndex] = updatedPrescription

        set({
          prescriptions: updatedPrescriptions,
          isLoading: false,
        })

        return updatedPrescription
      },

      deletePrescription: async (id: number) => {
        set({ isLoading: true })

        // Simula delay de rede
        await new Promise((resolve) => setTimeout(resolve, 300))

        const currentPrescriptions = get().prescriptions
        const updatedPrescriptions = currentPrescriptions.map((p) =>
          p.id === id ? { ...p, isDeleted: true } : p
        )

        set({
          prescriptions: updatedPrescriptions,
          isLoading: false,
        })

        return true
      },
    }),
    {
      name: 'prescription-storage',
    }
  )
)

