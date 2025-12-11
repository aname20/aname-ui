import { AgendaForms } from '@/pages/Agenda/components/AgendaForms'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { agendaNewSchema, type AgendaNewFormData } from './schemas/agendaNew.schema'

export const AgendaNew = () => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(agendaNewSchema),
    defaultValues: {
      title: '',
      description: '',
      diagnosis: '',
      dependentId: '',
      date: '',
      time: '',
      doctor: '',
      location: '',
      comments: '',
    },
  })

  const onSubmit = async (data: AgendaNewFormData) => {
    try {
      // TODO: Implementar chamada à API
      console.log('Dados do formulário:', data)
      navigate('/agenda')
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error)
    }
  }

  const handleCancel = () => {
    navigate('/agenda')
  }

  return (
    <AgendaForms
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      control={control as any}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
    />
  )
}

