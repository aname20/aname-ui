import React, { useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
  CircularProgress,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AddIcon from '@mui/icons-material/Add'
import NotificationsIcon from '@mui/icons-material/Notifications'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate, useParams } from 'react-router'
import { useForm, Controller, useFieldArray, useWatch, type Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  editMedicationSchema,
  type EditMedicationFormData,
} from './schema/schema'
import { formatDate } from '@/utils/date'
import { medicationService } from '@/services/medications'
import { mockDependents } from '@/stores/prescriptionStore'

export const EditMedication: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { id } = useParams<{ id: string }>()

  // Busca os dados da prescrição existente
  const { data: prescription, isLoading: isLoadingPrescription } = useQuery({
    queryKey: ['prescriptions', id],
    queryFn: () => medicationService.getPrescriptionDetails(id || ''),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })

  // Valores padrão para o formulário
  const defaultFormValues: EditMedicationFormData = {
    medication: '',
    dependent: '',
    doctor: '',
    dosage: '',
    dateUntil: undefined,
    continuousUse: true,
    times: ['08:00'],
    comments: undefined,
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditMedicationFormData>({
    resolver: yupResolver(editMedicationSchema) as unknown as Resolver<EditMedicationFormData, unknown, EditMedicationFormData>,
    defaultValues: defaultFormValues,
  })

  // Atualiza o formulário quando os dados da prescrição carregam
  useEffect(() => {
    if (prescription) {
      // Converte a data de ISO para DD/MM/YYYY
      let dateUntil: string | undefined
      if (prescription.endDate) {
        const date = new Date(prescription.endDate)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        dateUntil = `${day}/${month}/${year}`
      }

      reset({
        medication: prescription.medication?.name || '',
        dependent: prescription.dependentId || '',
        doctor: prescription.doctorName || '',
        dosage: prescription.dosage || '',
        dateUntil,
        continuousUse: prescription.type === 'CONTINUOUS',
        times: prescription.schedules?.map((s) => s.time) || ['08:00'],
        comments: prescription.notes || undefined,
      })
    }
  }, [prescription, reset])

  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-expect-error - React Hook Form type inference issue with Yup
    name: 'times',
  })

  const continuousUse = useWatch({
    control,
    name: 'continuousUse',
    defaultValue: true,
  })

  // Mutation para atualizar prescrição
  const { mutate: updatePrescription } = useMutation({
    mutationFn: (data: EditMedicationFormData) =>
      medicationService.updatePrescription(id || '', data),
    onSuccess: () => {
      // Invalida o cache para atualizar a listagem e os detalhes
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] })
      navigate(`/remedios/${id}`)
    },
    onError: (error) => {
      console.error('Erro ao atualizar prescrição:', error)
    },
  })

  const onSubmit = async (data: EditMedicationFormData) => {
    updatePrescription(data)
  }

  const handleCancel = () => {
    navigate(`/remedios/${id}`)
  }

  const handleAddTime = () => {
    append('08:00')
  }

  const handleRemoveTime = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  // Exibe loading enquanto carrega os dados
  if (isLoadingPrescription) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '40vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Box>
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            mb: 1,
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          Remédio
        </Typography>
        <Controller
          name="medication"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              placeholder="Pesquisar Remédio"
              error={!!errors.medication}
              helperText={errors.medication?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          )}
        />
      </Box>

      <Box>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          Dependente
        </Typography>
        <Controller
          name="dependent"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth size="small" error={!!errors.dependent}>
              <Select
                {...field}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: '#9e9e9e' }}>Selecionar</span>
                  }
                  // Busca o nome do dependente no mock
                  const dependent = mockDependents.find(d => d.id === selected)
                  return dependent?.name || selected
                }}
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: 2,
                  },
                }}
              >
                {mockDependents.map((dep) => (
                  <MenuItem key={dep.id} value={dep.id}>
                    {dep.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.dependent && (
                <Typography
                  variant="caption"
                  sx={{ color: 'error.main', mt: 0.5, ml: 1.75 }}
                >
                  {errors.dependent.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Box>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          Médico
        </Typography>
        <Controller
          name="doctor"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              placeholder="Inserir Nome do Médico"
              error={!!errors.doctor}
              helperText={errors.doctor?.message}
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          )}
        />
      </Box>

      <Box>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          Dosagem
        </Typography>
        <Controller
          name="dosage"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              placeholder="Pesquisar a dosagem"
              error={!!errors.dosage}
              helperText={errors.dosage?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          )}
        />
      </Box>

      <Box>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          Posologia
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'flex-start',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 0.5,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  color: 'text.secondary',
                }}
              >
                Até:
              </Typography>
              <Controller
                name="dateUntil"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    placeholder="DD/MM/YYYY"
                    disabled={continuousUse}
                    error={!!errors.dateUntil}
                    helperText={errors.dateUntil?.message}
                    value={field.value || ''}
                    onChange={(e) => {
                      const formatted = formatDate(e.target.value)
                      field.onChange(formatted)
                    }}
                    inputProps={{
                      maxLength: 10,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ mt: 3.5 }}>
              <Controller
                name="continuousUse"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        color="primary"
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        }}
                      >
                        Uso Contínuo
                      </Typography>
                    }
                  />
                )}
              />
            </Box>
          </Box>

          {fields.map((field, index) => (
            <Box
              key={field.id}
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
              }}
            >
              <Controller
                name={`times.${index}`}
                control={control}
                render={({ field: timeField }) => (
                  <TextField
                    {...timeField}
                    fullWidth
                    size="small"
                    type="time"
                    error={!!errors.times?.[index]}
                    helperText={errors.times?.[index]?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <AccessTimeIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                )}
              />
              {fields.length > 1 && (
                <IconButton
                  onClick={() => handleRemoveTime(index)}
                  size="small"
                  color="error"
                  type="button"
                >
                  <CloseIcon color="error" />
                </IconButton>
              )}
            </Box>
          ))}
          {errors.times && typeof errors.times.message === 'string' && (
            <Typography
              variant="caption"
              sx={{ color: 'error.main', mt: -1 }}
            >
              {errors.times.message}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddTime}
            type="button"
            sx={{
              borderRadius: 2,
              py: 1,
              textTransform: 'none',
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            }}
          >
            Adicionar Outro Horário +
          </Button>

          <Button
            variant="outlined"
            startIcon={<NotificationsIcon />}
            sx={{
              borderRadius: 2,
              py: 1,
              textTransform: 'none',
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': { borderColor: 'primary.dark' },
            }}
          >
            Adicionar Lembrete
          </Button>
        </Box>
      </Box>

      <Box>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          Comentários
        </Typography>
        <Controller
          name="comments"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={4}
              placeholder="Adicione comentários ou observações"
              error={!!errors.comments}
              helperText={errors.comments?.message}
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          )}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mt: 2,
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          onClick={handleCancel}
          type="button"
          sx={{
            borderRadius: 2,
            py: 1.5,
            textTransform: 'none',
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
              borderColor: 'primary.dark',
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={isSubmitting}
          sx={{
            borderRadius: 2,
            py: 1.5,
            textTransform: 'none',
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
          }}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </Box>
    </Box>
  )
}
