import { AgendaForms } from '@/pages/Agenda/components/AgendaForms'
import { eventsService } from '@/services/events/events.service'
import type { UpdateEventDto } from '@/types/event'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { agendaNewSchema, type AgendaNewFormData } from '../AgendaNew/schemas/agendaNew.schema'

export const AgendaEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
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

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        setError('ID do evento não fornecido')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const event = await eventsService.findOne(parseInt(id))
        
        // Transform API date to form format
        const eventDate = new Date(event.date)
        const dateStr = eventDate.toISOString().split('T')[0] // YYYY-MM-DD
        const timeStr = eventDate.toTimeString().slice(0, 5) // HH:MM

        // Populate form with event data
        reset({
          title: event.title,
          description: event.description || '',
          dependentId: event.dependentId,
          date: dateStr,
          time: timeStr,
          location: event.location || '',
          diagnosis: event.diagnosis || '',
          doctorName: event.doctorName || '',
          doctorCrm: event.doctorCrm || '',
        })
      } catch (err: any) {
        console.error('Error fetching event:', err)
        setError('Erro ao carregar evento')
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvent()
  }, [id, reset])

  const onSubmit = async (data: AgendaNewFormData) => {
    if (!id) return

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

      const eventData: UpdateEventDto = {
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

      console.log('Updating event:', eventData)
      await eventsService.update(parseInt(id), eventData)
      navigate('/agenda')
    } catch (error: any) {
      console.error('Erro ao atualizar agendamento:', error)
      console.error('Error response:', error.response?.data)
      
      const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido'
      alert(`Erro ao atualizar evento: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    navigate('/agenda')
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    )
  }

  return (
    <AgendaForms
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      control={control as any}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      submitLabel="Atualizar"
      isSubmitting={isSubmitting}
    />
  )
}
