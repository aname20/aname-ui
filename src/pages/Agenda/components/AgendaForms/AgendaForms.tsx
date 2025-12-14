import { PrimaryInput } from '@/components/forms/PrimaryInput'
import { PrimarySelect } from '@/components/forms/PrimarySelect'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, InputAdornment, MenuItem, Autocomplete, TextField } from '@mui/material'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { dependentService } from '@/services/dependents/dependents.service'
import { doctorsService } from '@/services/doctors/doctors.service'
import type { Dependent } from '@/types/medication'
import type { Doctor } from '@/types/event'

interface AgendaFormData {
  title: string
  description?: string
  dependentId: string
  date: string
  time: string
  location?: string
  diagnosis?: string
  doctorId?: number | null
}

interface AgendaFormsProps {
  control: Control<AgendaFormData>
  errors: FieldErrors<AgendaFormData>
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  onCancel: () => void
  submitLabel?: string
  isSubmitting?: boolean
}

export const AgendaForms: React.FC<AgendaFormsProps> = ({
  control,
  errors,
  onSubmit,
  onCancel,
  submitLabel = 'Salvar',
  isSubmitting = false,
}) => {
  const [dependents, setDependents] = useState<Dependent[]>([])
  const [isLoadingDependents, setIsLoadingDependents] = useState(true)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true)

  useEffect(() => {
    const fetchDependents = async () => {
      try {
        setIsLoadingDependents(true)
        const data = await dependentService.getDependents()
        setDependents(data)
      } catch (error) {
        console.error('Error fetching dependents:', error)
      } finally {
        setIsLoadingDependents(false)
      }
    }

    fetchDependents()
  }, [])

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoadingDoctors(true)
        const data = await doctorsService.findAll()
        setDoctors(data)
      } catch (error) {
        console.error('Error fetching doctors:', error)
      } finally {
        setIsLoadingDoctors(false)
      }
    }

    fetchDoctors()
  }, [])

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ pb: 2, pt: 2 }}>
      {/* Título */}
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            {...field}
            label="Título"
            placeholder="Inserir Título do Agendamento"
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
            sx={{ mb: 2 }}
          />
        )}
      />

      {/* Descrição */}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            {...field}
            label="Descrição"
            placeholder="Ex: Consulta, Exame, Cirurgia, etc..."
            fullWidth
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description?.message}
            sx={{ mb: 2 }}
          />
        )}
      />

      {/* Dependente */}
      <Controller
        name="dependentId"
        control={control}
        render={({ field }) => (
          <PrimarySelect
            {...field}
            label="Dependente"
            fullWidth
            error={!!errors.dependentId}
            helperText={errors.dependentId?.message}
            sx={{ mb: 2 }}
            disabled={isLoadingDependents}
          >
            <MenuItem value="">
              {isLoadingDependents ? 'Carregando...' : 'Selecionar'}
            </MenuItem>
            {dependents.map((dependent) => (
              <MenuItem key={dependent.id} value={dependent.id}>
                {dependent.name}
              </MenuItem>
            ))}
          </PrimarySelect>
        )}
      />

      {/* Data e Hora */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <PrimaryInput
              {...field}
              label="Data"
              type="date"
              fullWidth
              error={!!errors.date}
              helperText={errors.date?.message}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />

        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <PrimaryInput
              {...field}
              label="Hora"
              type="time"
              fullWidth
              error={!!errors.time}
              helperText={errors.time?.message}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
      </Box>

      {/* Médico */}
      <Controller
        name="doctorId"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <Autocomplete
            {...field}
            options={doctors}
            getOptionLabel={(option) => `${option.name} - ${option.specialty}`}
            loading={isLoadingDoctors}
            value={doctors.find((d) => d.id === value) || null}
            onChange={(_, newValue) => {
              onChange(newValue?.id || null)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Médico (Opcional)"
                placeholder="Buscar médico"
                error={!!errors.doctorId}
                helperText={errors.doctorId?.message}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoadingDoctors ? <SearchIcon sx={{ color: '#9E9E9E' }} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            sx={{ mb: 2 }}
          />
        )}
      />

      {/* Local */}
      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            {...field}
            label="Local"
            placeholder="Pesquisar o local"
            fullWidth
            error={!!errors.location}
            helperText={errors.location?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: '#9E9E9E' }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
        )}
      />

      {/* Diagnóstico */}
      <Controller
        name="diagnosis"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            {...field}
            label="Diagnóstico (Opcional)"
            placeholder="Inserir diagnóstico médico"
            fullWidth
            multiline
            rows={4}
            error={!!errors.diagnosis}
            helperText={errors.diagnosis?.message}
            sx={{ mb: 3 }}
          />
        )}
      />

      {/* Botões */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting || isLoadingDependents}
          sx={{
            bgcolor: '#456CE8',
            textTransform: 'none',
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 500,
            borderRadius: 2,
            '&:hover': {
              bgcolor: '#3557c9',
            },
            '&:disabled': {
              bgcolor: '#BDBDBD',
              color: '#FFFFFF',
            },
          }}
        >
          {isSubmitting ? 'Salvando...' : submitLabel}
        </Button>
        <Button
          type="button"
          variant="outlined"
          fullWidth
          onClick={onCancel}
          sx={{
            borderColor: '#E0E0E0',
            color: '#757575',
            textTransform: 'none',
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 500,
            borderRadius: 2,
            bgcolor: '#F5F5F5',
            '&:hover': {
              bgcolor: '#EEEEEE',
              borderColor: '#E0E0E0',
            },
          }}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  )
}
