import * as yup from 'yup'

export const medicationSchema = yup.object({
  name: yup
    .string()
    .required('O nome do medicamento é obrigatório')
    .min(2, 'O nome deve ter no mínimo 2 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),

  dosage: yup
    .string()
    .required('A dosagem é obrigatória')
    .matches(/^\d+(\.\d+)?\s*(mg|g|ml|UI)$/, 'Formato inválido. Ex: 500mg, 5ml'),

  frequency: yup
    .string()
    .required('A frequência é obrigatória'),

  schedules: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Adicione pelo menos um horário')
    .required('Os horários são obrigatórios'),

  notes: yup
    .string()
    .max(500, 'As observações devem ter no máximo 500 caracteres')
    .optional(),
})

export type MedicationFormData = yup.InferType<typeof medicationSchema>

