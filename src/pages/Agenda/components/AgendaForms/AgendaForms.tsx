import { PrimaryInput } from '@/components/forms/PrimaryInput'
import { useDependents } from '@/services/dependents/dependents.hooks'
import { useDoctors } from '@/services/doctors/doctors.hooks'
import SearchIcon from '@mui/icons-material/Search'
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'

interface AgendaFormData {
  title: string
  description: string
  diagnosis: string
  dependentId: string
  date: string
  doctor: string
  location: string
  comments?: string
}

interface AgendaFormsProps {
  control: Control<AgendaFormData>
  errors: FieldErrors<AgendaFormData>
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  onCancel: () => void
  submitLabel?: string,
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
  const { data: dependents = [], isLoading: isLoadingDependents } = useDependents()
  const { data: doctors = [], isLoading: isLoadingDoctors } = useDoctors()

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
          <Autocomplete
            options={dependents}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
            loading={isLoadingDependents}
            value={
              dependents.find((dep) => dep.id === field.value) || null
            }
            onChange={(_, newValue) => {
              field.onChange(newValue ? newValue.id : '')
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Dependente"
                error={!!errors.dependentId}
                helperText={errors.dependentId?.message}
                placeholder="Pesquisar dependente"
              />
            )}
            sx={{ mb: 2 }}
          />
        )}
      />

      {/* Data e Hora */}
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            {...field}
            label="Data e Hora"
            type="datetime-local"
            fullWidth
            error={!!errors.date}
            helperText={errors.date?.message}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
        )}
      />

      {/* Médico */}
      <Controller
        name="doctor"
        control={control}
        render={({ field }) => (
          <Autocomplete
            options={doctors}
            getOptionLabel={(option) => option.name}
            loading={isLoadingDoctors}
            value={
              doctors.find((doc) => doc.id === field.value || doc.name === field.value) || null
            }
            onChange={(_, newValue) => {
              field.onChange(newValue ? newValue.id : '')
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Médico"
                error={!!errors.doctor}
                helperText={errors.doctor?.message}
                placeholder="Pesquisar médico"
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
            sx={{ mb: 2 }}
          />
        )}
      />

      {/* Comentários */}
      <Controller
        name="comments"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            {...field}
            label="Comentários"
            placeholder="Adicione comentários ou observações"
            fullWidth
            multiline
            rows={4}
            error={!!errors.comments}
            helperText={errors.comments?.message}
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
            label="Diagnóstico"
            placeholder="Inserir Diagnóstico"
            fullWidth
            error={!!errors.diagnosis}
            helperText={errors.diagnosis?.message}
            sx={{ mb: 2 }}
            multiline
            rows={4}
          />
        )}
      />

      {/* Botões */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
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
          }}
        >
          {isSubmitting ? (
            <>
              <CircularProgress color="inherit" size={22} sx={{mr: 1}} />
            </>
          ) : submitLabel}
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

