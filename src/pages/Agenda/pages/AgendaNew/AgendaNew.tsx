import { AgendaForms } from '@/pages/Agenda/components/AgendaForms'
import { eventsService } from '@/services/events/events.service'
import type { CreateEventDto } from '@/types/event'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { agendaNewSchema, type AgendaNewFormData } from './schemas/agendaNew.schema'

export const AgendaNew = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(agendaNewSchema),
    defaultValues: {
      title: '',
      description: '',
      dependentId: '',
      date: '',
      time: '',
      location: '',
      diagnosis: '',
      doctorName: '',
      doctorCrm: '',
    },
  })

  const onSubmit = async (data: AgendaNewFormData) => {
    try {
      setIsSubmitting(true)
      
      // Combine date and time into ISO string
      const [year, month, day] = data.date.split('-')
      const [hours, minutes] = data.time.split(':')
      const dateTime = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes)
      ).toISOString()

      // Transform form data to API format
      const eventData: CreateEventDto = {
        title: data.title,
        description: data.description,
        date: dateTime,
        location: data.location,
        diagnosis: data.diagnosis,
        dependentId: data.dependentId,
        doctorName: data.doctorName,
      }

      // Add CRM if provided
      if (data.doctorCrm) {
        eventData.doctorCrm = data.doctorCrm
      }

      console.log('Sending event data:', eventData)
      await eventsService.create(eventData)
      navigate('/agenda')
    } catch (error: any) {
      console.error('Erro ao salvar agendamento:', error)
      console.error('Error response:', error.response?.data)
      console.error('Error status:', error.response?.status)
      
      const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido'
      alert(`Erro ao salvar evento: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
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
      isSubmitting={isSubmitting}
    />
  )
}
