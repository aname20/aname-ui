import * as yup from 'yup'

export const registerSchema = yup.object({
  name: yup
    .string()
    .required('O nome é obrigatório')
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),

  email: yup
    .string()
    .email('O formato do e-mail é inválido')
    .required('O e-mail é obrigatório'),

  password: yup
    .string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem coincidir')
    .required('Confirme sua senha'),
})

export type RegisterFormData = yup.InferType<typeof registerSchema>

