import { AgendaForms } from '@/pages/Agenda/components/AgendaForms'
import { useCreateEvent } from '@/services/agenda/agenda.hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { agendaNewSchema, type AgendaNewFormData } from './schemas/agendaNew.schema'

export const AgendaNew = () => {
  const navigate = useNavigate()
  const createEvent = useCreateEvent()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

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
      doctor: '',
      location: '',
      comments: '',
    },
  })

  const onSubmit = async (data: AgendaNewFormData) => {
    try {
      setError(null)
      
      // Converter datetime-local para formato ISO
      const dateISO = data.date ? new Date(data.date).toISOString() : ''
      
      await createEvent.mutateAsync({
        title: data.title,
        description: data.description,
        diagnosis: data.diagnosis,
        dependentId: data.dependentId,
        date: dateISO,
        doctorId: Number(data.doctor),
        location: data.location,
        comments: data.comments || '',
      })
      
      setSuccess(true)
      setTimeout(() => {
        navigate('/agenda')
      }, 1500)
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error)
      setError('Erro ao criar agendamento. Tente novamente.')
    }
  }

  const handleCancel = () => {
    navigate('/agenda')
  }

  const handleCloseError = () => {
    setError(null)
  }

  const handleCloseSuccess = () => {
    setSuccess(false)
  }

  return (
    <>
      <AgendaForms
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control={control as any}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        isSubmitting={createEvent.isPending}
      />

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={1500}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          Agendamento criado com sucesso!
        </Alert>
      </Snackbar>
    </>
  )
}

