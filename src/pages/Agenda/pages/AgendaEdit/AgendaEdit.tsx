import { AgendaForms } from '@/pages/Agenda/components/AgendaForms'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { agendaNewSchema, type AgendaNewFormData } from '../AgendaNew/schemas/agendaNew.schema'

// Mock data - substituir por chamada à API
const mockAppointment = {
  id: '1',
  title: 'Eletrocardiograma',
  description: 'Exame',
  diagnosis: 'Arritmia cardíaca',
  dependentId: '1',
  date: '2025-03-20',
  time: '09:00',
  doctor: 'Dr. Marco Di\'Angelo',
  location: 'AmorSaúde Caragibe',
  comments: 'Sem comentários',
}

export const AgendaEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  // TODO: Buscar dados reais da API usando o id
  const appointment = mockAppointment

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(agendaNewSchema),
    defaultValues: {
      title: appointment.title,
      description: appointment.description,
      diagnosis: appointment.diagnosis,
      dependentId: appointment.dependentId,
      date: appointment.date,
      time: appointment.time,
      doctor: appointment.doctor,
      location: appointment.location,
      comments: appointment.comments,
    },
  })

  const onSubmit = async (data: AgendaNewFormData) => {
    try {
      // TODO: Implementar chamada à API para atualizar
      console.log('Dados atualizados:', data, 'ID:', id)
      navigate(`/agenda/${id}`)
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error)
    }
  }

  const handleCancel = () => {
    navigate(`/agenda/${id}`)
  }

  return (
    <AgendaForms
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      control={control as any}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      submitLabel="Atualizar"
    />
  )
}

