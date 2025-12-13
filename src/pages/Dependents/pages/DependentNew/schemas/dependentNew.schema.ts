import * as yup from 'yup'

const emergencyContactSchema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  phone: yup.string().required('Telefone obrigatório'),
  kinship: yup.string(),
})

export const dependentNewSchema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  age: yup.number().required('Idade obrigatória').positive('Idade deve ser positiva').integer('Idade deve ser um número inteiro'),
  susCode: yup.string(),
  avatar: yup.mixed<File>().nullable(),
  conditions: yup.array().of(yup.string().required()).default([]),
  allergies: yup.array().of(yup.string().required()).default([]),
  caregiverIds: yup.array().of(yup.string().required()).default([]),
  emergencyContacts: yup.array().of(emergencyContactSchema).default([]),
})

export type DependentNewFormData = yup.InferType<typeof dependentNewSchema>

