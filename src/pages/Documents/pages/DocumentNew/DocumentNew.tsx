import { DocumentForms } from '@/pages/Documents/components/DocumentForms'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { documentNewSchema, type DocumentNewFormData } from './schemas/documentNew.schema'

export const DocumentNew = () => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(documentNewSchema),
    defaultValues: {
      title: '',
      dependentId: '',
      type: undefined,
      date: '',
      media: undefined,
      comments: '',
    },
  })

  const onSubmit = async (data: DocumentNewFormData) => {
    try {
      // TODO: Implementar chamada à API
      console.log('Dados do formulário:', data)
      navigate('/documentos')
    } catch (error) {
      console.error('Erro ao salvar documento:', error)
    }
  }

  const handleCancel = () => {
    navigate('/documentos')
  }

  return (
    <DocumentForms
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      control={control as any}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
    />
  )
}
