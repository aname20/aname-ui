import * as yup from 'yup'

export const userSchema = yup.object({
  name: yup
    .string()
    .required('O nome é obrigatório')
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),

  email: yup
    .string()
    .email('O formato do e-mail é inválido')
    .required('O e-mail é obrigatório'),

  phone: yup
    .string()
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Formato inválido. Use: (99) 99999-9999')
    .optional(),
})

export type UserFormData = yup.InferType<typeof userSchema>

