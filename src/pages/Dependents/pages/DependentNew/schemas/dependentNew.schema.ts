import * as yup from 'yup'

const emergencyContactSchema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  phone: yup.string().required('Telefone obrigatório'),
})

export const dependentNewSchema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  age: yup.number().required('Idade obrigatória').positive('Idade deve ser positiva').integer('Idade deve ser um número inteiro'),
  susCode: yup.string(),
  avatar: yup.mixed<File>().nullable(),
  conditions: yup.array().of(yup.string()),
  allergies: yup.array().of(yup.string()),
  caregivers: yup.array().of(yup.string()),
  emergencyContacts: yup.array().of(emergencyContactSchema).min(0),
})

export type DependentNewFormData = yup.InferType<typeof dependentNewSchema>

