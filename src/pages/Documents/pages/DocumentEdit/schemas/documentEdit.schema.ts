import * as yup from 'yup'
import { DocumentType } from '../../../types/DocumentType'

export const documentEditSchema = yup.object({
  title: yup.string().required('Título obrigatório'),
  dependentId: yup.string().required('Selecione um dependente'),
  type: yup.mixed<DocumentType>().oneOf(Object.values(DocumentType)).required('Selecione o tipo'),
  date: yup.string().required('Data obrigatória'),
  media: yup.mixed<File>().optional(),
  comments: yup.string().optional(),
})

export type DocumentEditFormData = yup.InferType<typeof documentEditSchema>

