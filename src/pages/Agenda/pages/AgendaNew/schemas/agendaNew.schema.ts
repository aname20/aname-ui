import * as yup from 'yup'

export const agendaNewSchema = yup.object({
  title: yup.string().required('Título obrigatório'),
  description: yup.string(),
  dependentId: yup.string().required('Selecione um dependente'),
  date: yup.string().required('Data obrigatória'),
  time: yup.string().required('Hora obrigatória'),
  location: yup.string(),
  diagnosis: yup.string(),
  doctorId: yup.number().nullable(),
})

export type AgendaNewFormData = yup.InferType<typeof agendaNewSchema>
