import { useCreatePrescription } from '@/services/prescriptions/prescription.hooks'
import { useMedications } from '@/services/medications/medication.hooks'
import { useDependents } from '@/services/dependents/dependents.hooks'
import { formatDate } from '@/utils/date'
import { yupResolver } from '@hookform/resolvers/yup'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AddIcon from '@mui/icons-material/Add'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'
import { Controller, useFieldArray, useForm, useWatch, type Resolver } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { defaultMedicationValues } from './constants'
import {
  addMedicationSchema,
  type AddMedicationFormData,
} from './schema/schema'
import { errorToast } from '@/hooks/useToast'

export const AddMedication: React.FC = () => {
  const navigate = useNavigate()
  const createPrescription = useCreatePrescription()
  const { data: dependents = [] } = useDependents()
  const { data: medications = [] } = useMedications()
  const [medicationSearch, setMedicationSearch] = useState('')
  const [showMedicationSuggestions, setShowMedicationSuggestions] = useState(false)
  const medicationInputRef = useRef<HTMLDivElement>(null)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddMedicationFormData>({
    resolver: yupResolver(addMedicationSchema) as unknown as Resolver<AddMedicationFormData, unknown, AddMedicationFormData>,
    defaultValues: {
      medication: defaultMedicationValues.medication,
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

  const filteredMedications = useMemo(() => {
    if (medicationSearch.length < 3) {
      return []
    }
    const searchLower = medicationSearch.toLowerCase()
    return medications.filter((med) =>
      med.name.toLowerCase().includes(searchLower)
    )
  }, [medicationSearch, medications])

  const handleMedicationChange = (value: string) => {
    setMedicationSearch(value)
    setValue('medication', value, { shouldValidate: true })

    if (value.length >= 3) {
      const searchLower = value.toLowerCase()
      const filtered = medications.filter((med) =>
        med.name.toLowerCase().includes(searchLower)
      )

      setShowMedicationSuggestions(filtered.length > 0)
    } else {
      setShowMedicationSuggestions(false)
    }
  }

  const handleSelectMedication = (medicationId: number, medicationName: string) => {
    setValue('medication', String(medicationId), { shouldValidate: true })

    setMedicationSearch(medicationName)
    setShowMedicationSuggestions(false)
  }

  const onSubmit = async (data: AddMedicationFormData) => {
    try {
      await createPrescription.mutateAsync(data)
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
      <Box sx={{ position: 'relative' }}>
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
        <Box ref={medicationInputRef}>
          <Controller
            name="medication"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={medicationSearch || field.value || ''}
                onChange={(e) => {
                  handleMedicationChange(e.target.value)
                }}
                onFocus={() => {
                  if (medicationSearch.length >= 3) {
                    const searchLower = medicationSearch.toLowerCase()
                    const filtered = medications.filter((med) =>
                      med.name.toLowerCase().includes(searchLower)
                    )
                    setShowMedicationSuggestions(filtered.length > 0)
                  }
                }}
                onBlur={() => {

                  setTimeout(() => {
                    setShowMedicationSuggestions(false)
                  }, 200)
                }}
                fullWidth
                size="small"
                placeholder="Pesquisar Remédio (mínimo 3 letras)"
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
        {showMedicationSuggestions && filteredMedications.length > 0 && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1000,
              mt: 0.5,
              maxHeight: 300,
              overflow: 'auto',
              borderRadius: 2,
            }}
          >
            <List dense sx={{ py: 0 }}>
              {filteredMedications.map((medication) => (
                <ListItemButton
                  key={medication.id}
                  onClick={() => handleSelectMedication(medication.id, medication.name)}
                  sx={{
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemText
                    primary={medication.name}
                    secondary={medication.description}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                    }}
                    secondaryTypographyProps={{
                      fontSize: '0.75rem',
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}
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
                  const dependent = dependents.find(d => d.id === selected)
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
