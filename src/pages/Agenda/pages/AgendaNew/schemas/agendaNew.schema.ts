import * as yup from 'yup'

export const agendaNewSchema = yup.object({
  title: yup.string().required('Título obrigatório'),
  description: yup.string().required('Descrição obrigatória'),
  diagnosis: yup.string().required('Diagnóstico obrigatório'),
  dependentId: yup.string().required('Selecione um dependente'),
  date: yup.string().required('Data e hora obrigatórias'),
  doctor: yup.string().required('Nome do médico obrigatório'),
  location: yup.string().required('Local obrigatório'),
  comments: yup.string(),
})

export type AgendaNewFormData = yup.InferType<typeof agendaNewSchema>

