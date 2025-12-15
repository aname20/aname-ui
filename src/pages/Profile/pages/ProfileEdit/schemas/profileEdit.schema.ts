import * as yup from 'yup'

export const profileEditSchema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  phone: yup.string().optional().default(undefined),
})

export type ProfileEditFormData = yup.InferType<typeof profileEditSchema>
