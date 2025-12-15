import { errorToast, successToast } from '@/hooks/useToast'
import { useDependents } from '@/services/dependents/dependents.hooks'
import { useMedications } from '@/services/medications/medication.hooks'
import { useCreatePrescription } from '@/services/prescriptions/prescription.hooks'
import { formatDate } from '@/utils/date'
import { yupResolver } from '@hookform/resolvers/yup'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AddIcon from '@mui/icons-material/Add'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import React, { useMemo } from 'react'
import {
  Controller,
  useFieldArray,
  useForm,
  useWatch,
  type Resolver,
} from 'react-hook-form'
import { useNavigate } from 'react-router'
import { defaultMedicationValues } from './constants'
import {
  addMedicationSchema,
  type AddMedicationFormData,
} from './schema/schema'

export const AddMedication: React.FC = () => {
  const navigate = useNavigate()
  const createPrescription = useCreatePrescription()
  const { data: dependents = [] } = useDependents()
  const { data: medicationsData } = useMedications()

  const medications = useMemo(() => {
    // Verificar se medicationsData é array direto ou se tem propriedade data
    const medicationsArray = Array.isArray(medicationsData)
      ? medicationsData
      : (medicationsData as any)?.data || []

    return Array.isArray(medicationsArray) ? medicationsArray : []
  }, [medicationsData])

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddMedicationFormData>({
    resolver: yupResolver(addMedicationSchema) as unknown as Resolver<
      AddMedicationFormData,
      unknown,
      AddMedicationFormData
    >,
    defaultValues: {
      medicationId: defaultMedicationValues.medicationId,
      dependent: defaultMedicationValues.dependent,
      doctor: defaultMedicationValues.doctor,
      dosage: defaultMedicationValues.dosage,
      dateUntil: defaultMedicationValues.dateUntil || undefined,
      continuousUse: defaultMedicationValues.continuousUse,
      times: defaultMedicationValues.times,
      comments: defaultMedicationValues.comments || undefined,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-expect-error - React Hook Form type inference issue with Yup
    name: 'times',
  })

  const continuousUse = useWatch({
    control,
    name: 'continuousUse',
    defaultValue: defaultMedicationValues.continuousUse,
  })

  const onSubmit = async (data: AddMedicationFormData) => {
    try {
      await createPrescription.mutateAsync(data)

      successToast('Prescrição criada com sucesso')
      navigate('/remedios')
    } catch {
      errorToast('Erro ao criar prescrição')
    }
  }

  const handleCancel = () => {
    navigate('/remedios')
  }

  const handleAddTime = () => {
    append('08:00')
  }

  const handleRemoveTime = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
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
          name="medicationId"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth size="small" error={!!errors.medicationId}>
              <Select
                {...field}
                displayEmpty
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(Number(e.target.value))
                }}
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: '#9e9e9e' }}>Selecionar</span>
                  }

                  const medication = medications.find(
                    (m) => m.id === Number(selected),
                  )

                  return medication?.name || selected
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
                {medications.map((medication) => (
                  <MenuItem key={medication.id} value={medication.id}>
                    {medication.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.medicationId && (
                <Typography
                  variant="caption"
                  sx={{ color: 'error.main', mt: 0.5, ml: 1.75 }}
                >
                  {errors.medicationId.message}
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
                  // Busca o nome do dependente
                  const dependent = dependents.find((d) => d.id === selected)
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
                {dependents.map((dep) => (
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
              placeholder="Inserir a dosagem"
              error={!!errors.dosage}
              helperText={errors.dosage?.message}
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
            <Typography variant="caption" sx={{ color: 'error.main', mt: -1 }}>
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

          {/* <Button
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
          </Button> */}
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
          disabled={isSubmitting || createPrescription.isPending}
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
