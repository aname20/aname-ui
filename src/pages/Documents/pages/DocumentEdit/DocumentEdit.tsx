import { DocumentForms } from '@/pages/Documents/components/DocumentForms'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { documentNewSchema, type DocumentNewFormData } from '../DocumentNew/schemas/documentNew.schema'
import { DocumentType } from '../../types/DocumentType'

// Mock data - substituir por chamada à API
const mockDocument = {
  id: '1',
  title: 'Laboratório Viver',
  dependentId: '1',
  type: DocumentType.PRESCRIPTION,
  date: '2025-01-25',
  media: null,
  comments: 'Manual sobre de consulta paga Dr. Bruna',
}

export const DocumentEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  // TODO: Buscar dados reais da API usando o id
  const document = mockDocument

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(documentNewSchema),
    defaultValues: {
      title: document.title,
      dependentId: document.dependentId,
      type: document.type,
      date: document.date,
      media: document.media,
      comments: document.comments,
    },
  })

  const onSubmit = async (data: DocumentNewFormData) => {
    try {
      // TODO: Implementar chamada à API para atualizar
      console.log('Dados atualizados:', data, 'ID:', id)
      navigate(`/documentos/${id}`)
    } catch (error) {
      console.error('Erro ao atualizar documento:', error)
    }
  }

  const handleCancel = () => {
    navigate(`/documentos/${id}`)
  }

  return (
    <DocumentForms
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      control={control as any}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      submitLabel="Atualizar"
    />
  )
}
